import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Clients } from '../clients/entities/client.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendMail(client: Clients, myotp: string) {
    await this.mailerService.sendMail({
      to: client.email,
      subject: 'Welcome to online booking card',
      template: './confirm',
      context: {
        first_name: client.first_name,
        myotp,
      },
    });
  }
}
