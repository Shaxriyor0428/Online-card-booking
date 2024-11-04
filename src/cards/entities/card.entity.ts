import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Banks } from '../../banks/entities/bank.entity';

@Entity()
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  limit: number;

  @Column()
  fees: string;

  @Column()
  is_online_card: boolean;

  @Column()
  expiration_date: string;

  @Column()
  issued_date: string;

  @Column()
  currency: string;

  @Column()
  card_typeId: number;

  @ManyToMany(() => Banks, (bank) => bank.cards)
  @JoinTable({ name: 'card_bank' })
  banks: Banks[];
}
