import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Card } from './entities/card.entity';
import { Repository } from 'typeorm';
import { BanksService } from '../banks/banks.service';
import { CardTypesService } from '../card_types/card_types.service';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card) private cardRepo: Repository<Card>,
    private readonly bankService: BanksService,
    private readonly cardTypeService: CardTypesService,
  ) {}
  async create(createCardDto: CreateCardDto) {
    const bank = await this.bankService.findOne(createCardDto.bankId);
    if (!bank) {
      throw new NotFoundException('Bank not found');
    }
    const card_type = await this.cardTypeService.findOne(
      createCardDto.card_typeId,
    );
    if (!card_type) {
      throw new NotFoundException('Card type not found');
    }
    const card = await this.cardRepo.save({ ...createCardDto, banks: [bank] });
    const savedCard = await this.cardRepo.findOne({
      where: { id: card.id },
      select: [
        'id',
        'limit',
        'fees',
        'is_online_card',
        'expiration_date',
        'issued_date',
        'currency',
      ],
    });

    return savedCard;
  }

  findAll() {
    return this.cardRepo.find({
      relations: ['banks'],
    });
  }

  findOne(id: number) {
    return this.cardRepo.findOneBy({ id });
  }

  update(id: number, updateCardDto: UpdateCardDto) {
    return this.cardRepo.update(id, updateCardDto);
  }

  remove(id: number) {
    return this.cardRepo.delete(id);
  }
}
