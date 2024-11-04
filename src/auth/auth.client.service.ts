import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientsService } from '../clients/clients.service';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../mail/mail.service';
import { Clients } from '../clients/entities/client.entity';
import { Response } from 'express';
import { CreateClientDto } from '../clients/dto/create-client.dto';
import { generate } from 'otp-generator';
import { compare, hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientSigInDto } from './dto/client-signin.dto';
import { Otp } from '../otp/entities/otp.entity';
import * as uuid from 'uuid';
import { AddMinutesToDate } from '../helpers/add-minute';
import { decode, encode } from '../helpers/crypto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { ConfirmPassportDataDto } from './dto/confirm-password.data.dto';

@Injectable()
export class AuthClientService {
  constructor(
    private readonly clientService: ClientsService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    @InjectRepository(Clients) private clientRepo: Repository<Clients>,
    @InjectRepository(Otp) private otpRepo: Repository<Otp>,
  ) {}

  async generateTokens(client: Clients) {
    const payload = {
      id: client.id,
      email: client.email,
      first_name: client.first_name,
    };
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.sign(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.sign(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return { access_token, refresh_token };
  }

  async updateRefreshToken(clientId: number, refresh_token: string) {
    const hashed_refresh_token = await hash(refresh_token, 7);

    await this.clientRepo.update({ id: clientId }, { hashed_refresh_token });
  }

  async signUp(res: Response, createClientDto: CreateClientDto) {
    const client = await this.clientService.create(createClientDto);

    console.log(client);

    if (!client) {
      throw new BadRequestException('Client not found');
    }

    const tokens = await this.generateTokens(client);
    console.log(tokens);

    if (!tokens) {
      throw new BadRequestException('Token not found');
    }

    await this.updateRefreshToken(client.id, tokens.refresh_token);

    res.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: true,
      maxAge: +process.env.COOKIE_TIME,
    });

    const otp = generate(4, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
      digits: true,
    });

    const now = new Date();
    const expiration_time = AddMinutesToDate(now, 5);
    await this.otpRepo.delete({ email: client.email });

    const newOtp = await this.otpRepo.save({
      id: uuid.v4(),
      otp,
      expiration_time,
      email: client.email,
    });

    const details = {
      time: now,
      email: client.email,
      otp_id: newOtp.id,
    };

    const encodedData = await encode(JSON.stringify(details));

    try {
      await this.mailService.sendMail(client, otp);
    } catch (error) {
      console.error('Error on signup', error);
      throw new InternalServerErrorException(
        'Error sending activation otp code',
      );
    }

    return {
      id: client.id,
      access_token: tokens.access_token,
      details: encodedData,
      sms: 'Otp code sent your email',
    };
  }

  async verifyOtp(verifyOtpDto: VerifyOtpDto) {
    const { verification_key, otp, email } = verifyOtpDto;
    const currentTime = new Date();

    const decodedData = await decode(verification_key);
    const details = JSON.parse(decodedData);

    if (details.email !== email) {
      throw new BadRequestException('Otp has not been sent this email');
    }
    const resultOtp = await this.otpRepo.findOne({
      where: { id: details.otp_id },
    });
    if (!resultOtp) {
      throw new BadRequestException('This otp not found');
    }

    if (resultOtp.verified) {
      throw new BadRequestException('This client already activated');
    }
    if (resultOtp.expiration_time < currentTime) {
      throw new BadRequestException('This otp has expired');
    }
    if (resultOtp.otp != otp) {
      throw new BadRequestException('Otp not match');
    }
    const client = await this.clientRepo.update({ email }, { is_active: true });
    const newClient = await this.clientRepo.findOne({ where: { email } });

    if (!client) {
      throw new BadRequestException('Client not found');
    }

    await this.otpRepo.update({ id: details.otp_id }, { verified: true });

    return {
      message: 'You have been active',
      id: newClient.id,
    };
  }

  async signIn(res: Response, clientSigInDto: ClientSigInDto) {
    const { email, password } = clientSigInDto;

    const client = await this.clientRepo.findOne({ where: { email } });
    if (!client) {
      throw new UnauthorizedException('Password or Email incorrect');
    }

    const validPassword = await compare(password, client.hashed_password);
    if (!validPassword) {
      throw new UnauthorizedException('Password or Email incorrect');
    }
    const tokens = await this.generateTokens(client);

    await this.updateRefreshToken(client.id, tokens.refresh_token);
    res.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: true,
      maxAge: +process.env.COOKIE_TIME,
    });
    return {
      id: client.id,
      access_token: tokens.access_token,
    };
  }

  async handleRefreshToken(
    clientId: number,
    refreshToken: string,
    res: Response,
  ) {
    const client = await this.clientRepo.findOne({ where: { id: +clientId } });
    console.log(client, refreshToken);

    if (!client || !client.hashed_refresh_token) {
      throw new BadRequestException('Client not found');
    }
    const rMatchesh = await compare(refreshToken, client.hashed_refresh_token);
    if (!rMatchesh) {
      throw new ForbiddenException('Access denied');
    }

    const decodedToken = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!decodedToken) {
      throw new UnauthorizedException('Token expired');
    }

    const tokens = await this.generateTokens(client);
    await this.updateRefreshToken(client.id, tokens.refresh_token);
    res.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: true,
      maxAge: +process.env.COOKIE_TIME,
    });
    return {
      id: client.id,
      access_token: tokens.access_token,
    };
  }

  async clientSignOut(clientId: number, res: Response) {
    const client = await this.clientRepo.update(
      {
        id: clientId,
      },
      { hashed_refresh_token: null },
    );

    if (!client) {
      throw new NotFoundException('Client not found');
    }
    res.clearCookie('refresh_token');
    return {
      message: 'User successfully sign out',
    };
  }
  async confirmPassportData(confirmPassportDataDto: ConfirmPassportDataDto) {
    const {
      birth_date,
      passport_expiry_date,
      passport_issue_date,
      passport_number,
      phone_number,
    } = confirmPassportDataDto;

    const client = await this.clientRepo.findOne({ where: { phone_number } });

    if (!client) {
      throw new BadRequestException('Client not found');
    }

    if (!client.is_active) {
      throw new BadRequestException(
        'You are not active, first you need to be active ',
      );
    }

    if (client.verified) {
      throw new BadRequestException('Client is already verified');
    }

    client.birth_date = birth_date;
    client.passport_expiry_date = passport_expiry_date;
    client.passport_issue_date = passport_issue_date;
    client.passport_number = passport_number;
    client.verified = true;

    await this.clientRepo.save(client);

    return {
      message: 'You successfully confirmed your passport data',
    };
  }
}
