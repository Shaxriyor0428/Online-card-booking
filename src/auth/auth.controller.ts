import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { CreateAdminDto } from '../admin/dto/create-admin.dto';
import { AdminSignInDto } from './dto/create-auth.dto';
import { RefreshTokenGuard } from '../common/guards/refresh_token.guard';
import { GetCurrentUser } from '../common/decorators/get-current-userid';
import { AdminAccessTokenGuard } from '../common/guards/access_token.guard';
import { Public } from '../common/decorators/is-public.decorator';
import { IsCreatorGuard } from '../common/guards/is_creator.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Admin } from '../admin/entities/admin.entity';

@ApiTags('Auth')
@UseGuards(AdminAccessTokenGuard)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(IsCreatorGuard)
  @ApiOperation({ summary: 'Add new Admin' })
  @ApiResponse({
    status: 201,
    description: 'Admin has been created successfully',
    type: Admin,
  })
  @Post('add')
  async addAdmin(
    @Res({ passthrough: true }) res: Response,
    @Body() createAdminDto: CreateAdminDto,
  ) {
    return this.authService.addAdmin(res, createAdminDto);
  }

  @Public()
  @ApiOperation({ summary: 'Admin signIn' })
  @ApiResponse({
    status: 200,
    description: 'Admin signed in successfully',
  })
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async adminSignIn(
    @Res({ passthrough: true }) res: Response,
    @Body() adminSignInDto: AdminSignInDto,
  ) {
    return this.authService.adminSignIn(res, adminSignInDto);
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @ApiOperation({ summary: 'Admin refresh token' })
  @ApiResponse({
    status: 200,
    description: 'Admin refresh token refreshed successfully',
  })
  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  async handleRefreshToken(
    @GetCurrentUser('id') id: number,
    @GetCurrentUser('refreshToken') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.handleRefreshToken(id, refreshToken, res);
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @ApiOperation({ summary: 'Admin logout' })
  @ApiResponse({ status: 200, description: 'Admin logged out successfully' })
  @Post('signout')
  async adminSignOut(
    @GetCurrentUser('id') id: number,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.adminSignOut(id, res);
  }
}
