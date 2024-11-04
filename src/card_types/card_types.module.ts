import { Module } from '@nestjs/common';
import { CardTypesService } from './card_types.service';
import { CardTypesController } from './card_types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardType } from './entities/card_type.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([CardType]), JwtModule],
  controllers: [CardTypesController],
  providers: [CardTypesService],
  exports: [CardTypesService],
})
export class CardTypesModule {}
