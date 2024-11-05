import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OrderStatusEnum } from '../../common/types';
import { Delivery } from '../../delivery/entities/delivery.entity';
import { Transaction } from '../../transactions/entities/transaction.entity';
import { OrderDetail } from '../../order_details/entities/order_detail.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  clientId: number;

  @Column({ type: 'int', nullable: true })
  discountId: number;

  @Column({ type: 'float' })
  price: number;

  @Column({ type: 'enum', enum: OrderStatusEnum, default: OrderStatusEnum.NEW })
  status: OrderStatusEnum;

  @Column({ type: 'date' })
  order_date: string;

  @OneToOne(() => Delivery, (delivery) => delivery.order)
  delivery: Delivery;

  @OneToOne(() => Transaction, (transaction) => transaction.order)
  transaction: Transaction;

  @OneToOne(() => OrderDetail, (order_details) => order_details.order)
  order_details: OrderDetail[];
}
