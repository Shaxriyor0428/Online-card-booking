import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { hash, compare } from 'bcrypt';
import { AdminService } from '../admin/admin.service';
import { CreateAdminDto } from '../admin/dto/create-admin.dto';
import { Admin } from '../admin/entities/admin.entity';
import { JwtPayload, ResponseFields, Tokens } from '../common/types';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Response } from 'express';
import { AdminSignInDto } from './dto/create-auth.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
    @InjectRepository(Admin) private readonly adminRepo: Repository<Admin>,
  ) {}

  async adminGenerateTokens(admin: Admin): Promise<Tokens> {
    const payload: JwtPayload = {
      id: admin.id,
      email: admin.email,
      phone: admin.phone_number,
      role: admin.role,
    };
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.sign(payload, {
        secret: process.env.ADMIN_ACCESS_TOKEN_KEY,
        expiresIn: process.env.ADMIN_ACCESS_TOKEN_TIME,
      }),
      this.jwtService.sign(payload, {
        secret: process.env.ADMIN_REFRESH_TOKEN_KEY,
        expiresIn: process.env.ADMIN_REFRESH_TOKEN_TIME,
      }),
    ]);
    return { access_token, refresh_token };
  }

  async updateRefreshToken(adminId: number, refresh_token: string) {
    const hashed_refresh_token = await hash(refresh_token, 7);

    await this.adminRepo.update({ id: adminId }, { hashed_refresh_token });
  }

  async addAdmin(
    res: Response,
    createAdminDto: CreateAdminDto,
  ): Promise<ResponseFields> {
    const newAdmin = await this.adminService.create(createAdminDto);

    const tokens = await this.adminGenerateTokens(newAdmin);
    if (!tokens) {
      throw new BadRequestException('Token not found');
    }
    await this.updateRefreshToken(newAdmin.id, tokens.refresh_token);
    res.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: true,
      maxAge: +process.env.COOKIE_TIME,
    });
    return {
      id: newAdmin.id,
      access_token: tokens.access_token,
    };
  }

  async adminSignIn(
    res: Response,
    adminSignInDto: AdminSignInDto,
  ): Promise<ResponseFields> {
    const { password, email } = adminSignInDto;
    const admin = await this.adminRepo.findOne({ where: { email } });
    if (!admin) {
      throw new UnauthorizedException('Password or Email incorrect');
    }
    const validPassword = await compare(password, admin.hashed_password);
    if (!validPassword) {
      throw new UnauthorizedException('Password or Email incorrect');
    }
    const tokens = await this.adminGenerateTokens(admin);

    await this.updateRefreshToken(admin.id, tokens.refresh_token);
    res.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: true,
      maxAge: +process.env.COOKIE_TIME,
    });
    return {
      id: admin.id,
      access_token: tokens.access_token,
    };
  }

  async handleRefreshToken(
    userId: number,
    refreshToken: string,
    res: Response,
  ): Promise<ResponseFields> {
    const admin = await this.adminService.findOne(userId);
    if (!admin || !admin.hashed_refresh_token) {
      throw new BadRequestException('Admin not found');
    }

    const rMatchesh = await compare(refreshToken, admin.hashed_refresh_token);
    if (!rMatchesh) {
      throw new ForbiddenException('Access denied');
    }

    const decodedToken = await this.jwtService.decode(refreshToken);
    if (!decodedToken) {
      throw new UnauthorizedException('Token expired');
    }

    const tokens = await this.adminGenerateTokens(admin);
    if (!tokens) {
      throw new BadRequestException('Tokens are not come');
    }
    await this.updateRefreshToken(admin.id, tokens.refresh_token);
    res.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: true,
      maxAge: +process.env.COOKIE_TIME,
    });

    return {
      id: admin.id,
      access_token: tokens.access_token,
    };
  }

  async adminSignOut(adminId: number, res: Response) {
    const admin = await this.adminRepo.update(
      { id: adminId },
      { hashed_refresh_token: null },
    );
    if (!admin) {
      throw new NotFoundException('Admin not found');
    }
    res.clearCookie('refresh_token');
    return {
      message: 'User successfully sign out',
    };
  }
}
