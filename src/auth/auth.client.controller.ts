import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { AuthClientService } from './auth.client.service';
import { Response } from 'express';
import { CreateClientDto } from '../clients/dto/create-client.dto';
import { ClientSigInDto } from './dto/client-signin.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { CookieGetter } from '../common/decorators/cookie.decorator';
import { ClientRefreshTokenGuard } from '../common/guards/client.refresh_token.guard';
import { GetCurrentClientId } from '../common/decorators/client-get_id.decorator';
import { ConfirmPassportDataDto } from './dto/confirm-password.data.dto';

@Controller('auth-client')
export class AuthClientController {
  constructor(private readonly authClientService: AuthClientService) {}

  @Post('signup')
  async singUp(
    @Res({ passthrough: true }) res: Response,
    @Body()
    createClientDto: CreateClientDto,
  ) {
    return await this.authClientService.signUp(res, createClientDto);
  }

  @Post('signin')
  async signIn(
    @Res({ passthrough: true }) res: Response,
    @Body()
    clientSigInDto: ClientSigInDto,
  ) {
    return await this.authClientService.signIn(res, clientSigInDto);
  }

  @UseGuards(ClientRefreshTokenGuard)
  @Post('refresh-token')
  async handleRefreshToken(
    @GetCurrentClientId('id') id: number,
    @CookieGetter() refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authClientService.handleRefreshToken(+id, refreshToken, res);
  }

  @UseGuards(ClientRefreshTokenGuard)
  @Post('signout')
  async signOut(
    @GetCurrentClientId('id') id: number,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authClientService.clientSignOut(id, res);
  }

  @Post('verifyotp')
  async verifyOtp(@Body() verificationOtpDto: VerifyOtpDto) {
    return this.authClientService.verifyOtp(verificationOtpDto);
  }

  @Post('confirm-passport')
  async confirmPassportData(
    @Body() confirmPassportDataDto: ConfirmPassportDataDto,
  ) {
    return this.authClientService.confirmPassportData(confirmPassportDataDto);
  }
}
