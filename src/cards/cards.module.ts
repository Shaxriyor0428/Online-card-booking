import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BanksModule } from '../banks/banks.module';
import { Card } from './entities/card.entity';
import { CardTypesModule } from '../card_types/card_types.module';

@Module({
  imports: [TypeOrmModule.forFeature([Card]), BanksModule, CardTypesModule],
  controllers: [CardsController],
  providers: [CardsService],
  exports: [CardsService],
})
export class CardsModule {}
