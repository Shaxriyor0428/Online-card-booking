import { Injectable } from '@nestjs/common';
import { CreateCardTypeDto } from './dto/create-card_type.dto';
import { UpdateCardTypeDto } from './dto/update-card_type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CardType } from './entities/card_type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CardTypesService {
  constructor(
    @InjectRepository(CardType) private cardTypeRepo: Repository<CardType>,
  ) {}
  create(createCardTypeDto: CreateCardTypeDto) {
    return this.cardTypeRepo.save(createCardTypeDto);
  }

  findAll() {
    return this.cardTypeRepo.find();
  }

  findOne(id: number) {
    return this.cardTypeRepo.findOneBy({ id });
  }

  update(id: number, updateCardTypeDto: UpdateCardTypeDto) {
    return this.cardTypeRepo.update(id, updateCardTypeDto);
  }

  remove(id: number) {
    return this.cardTypeRepo.delete(id);
  }
}
