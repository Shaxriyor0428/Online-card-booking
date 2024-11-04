import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TransactionStatus } from '../../common/types';

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
}
