import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TransactionStatus } from '../../common/types';
import { Order } from '../../orders/entities/order.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'float' })
  amount: number;

  @Column({
    type: 'enum',
    enum: TransactionStatus,
  })
  status: TransactionStatus;

  @Column({ type: 'varchar' })
  payment_date: string;

  @Column({ nullable: true })
  orderId: number;

  @OneToOne(() => Order, (order) => order.transaction)
  @JoinColumn({ name: 'orderId' })
  order: Order;
}
