import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Card } from '../../cards/entities/card.entity';

@Entity('card_type')
export class CardType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Card, (card) => card.card_type)
  cards: Card[];
}
