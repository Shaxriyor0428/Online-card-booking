import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Clients } from './entities/client.entity';
import { Repository } from 'typeorm';
import { RegionsService } from '../regions/regions.service';
import { hash } from 'bcrypt';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Clients) private readonly clientRepo: Repository<Clients>,
    private readonly regionService: RegionsService,
  ) {}
  async create(createClientDto: CreateClientDto) {
    const region = await this.regionService.findOne(createClientDto.regionId);

    if (!region) {
      throw new NotFoundException('Region not found');
    }
    const existingClient = await this.clientRepo.findOne({
      where: { email: createClientDto.email },
    });

    if (existingClient) {
      throw new NotFoundException('Client already exists');
    }

    if (createClientDto.password !== createClientDto.confirm_password) {
      throw new BadRequestException('Passwords not match');
    }

    const hashed_password = await hash(createClientDto.password, 7);
    const newClient = await this.clientRepo.save({
      ...createClientDto,
      hashed_password,
    });
    return newClient;
  }

  async findAll() {
    return this.clientRepo.find({
      relations: ['order_details'],
    });
  }

  findOne(id: number) {
    return this.clientRepo.findOne({ where: { id } });
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return this.clientRepo.update(id, updateClientDto);
  }

  remove(id: number) {
    return this.clientRepo.delete(id);
  }
}
