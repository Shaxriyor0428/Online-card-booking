import { Injectable } from '@nestjs/common';
import { CreateBankDto } from './dto/create-bank.dto';
import { UpdateBankDto } from './dto/update-bank.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Banks } from './entities/bank.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BanksService {
  constructor(@InjectRepository(Banks) private bankRepo: Repository<Banks>) {}
  create(createBankDto: CreateBankDto) {
    return this.bankRepo.save(createBankDto);
  }

  findAll() {
    return this.bankRepo.find({
      relations: ['cards'],
    });
  }

  findOne(id: number) {
    return this.bankRepo.findOne({ where: { id }, relations: ['cards'] });
  }

  async update(id: number, updateBankDto: UpdateBankDto) {
    const result = await this.bankRepo.update(id, updateBankDto);
    return result.affected > 0 ? await this.bankRepo.findOneBy({ id }) : null;
  }

  remove(id: number) {
    return this.bankRepo.delete(id);
  }
}
