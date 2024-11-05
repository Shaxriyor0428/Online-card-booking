import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Banks } from '../../banks/entities/bank.entity';
import { CardType } from '../../card_types/entities/card_type.entity';
import { OrderDetail } from '../../order_details/entities/order_detail.entity';

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

  @ManyToOne(() => CardType, (card_type) => card_type.cards)
  @JoinColumn({ name: 'card_typeId' })
  card_type: CardType;

  @OneToMany(() => OrderDetail, (order_details) => order_details.card)
  order_details: OrderDetail[];
}
