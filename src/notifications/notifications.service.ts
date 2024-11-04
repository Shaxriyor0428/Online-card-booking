import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { Repository } from 'typeorm';
import { ClientsService } from '../clients/clients.service';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepo: Repository<Notification>,
    private readonly clientService: ClientsService,
  ) {}
  async create(createNotificationDto: CreateNotificationDto) {
    const client = await this.clientService.findOne(
      createNotificationDto.clientId,
    );
    if (!client) {
      throw new BadRequestException('Client not found');
    }
    return this.notificationRepo.save(createNotificationDto);
  }

  findAll() {
    return this.notificationRepo.find();
  }

  findOne(id: number) {
    return this.notificationRepo.findOneBy({ id });
  }

  update(id: number, updateNotificationDto: UpdateNotificationDto) {
    return this.notificationRepo.update(id, updateNotificationDto);
  }

  remove(id: number) {
    return this.notificationRepo.delete(id);
  }
}
