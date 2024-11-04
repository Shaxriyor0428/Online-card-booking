import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DeliveryStatus } from '../../common/types';
import { Order } from '../../orders/entities/order.entity';

@Entity()
export class Delivery {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  delivery_date: string;

  @Column({ type: 'time' })
  delivery_time: string;

  @Column()
  address: string;

  @Column({
    type: 'enum',
    enum: DeliveryStatus,
    default: DeliveryStatus.NEW,
  })
  status: DeliveryStatus;

  @Column('int')
  delivery_price: number;

  @OneToOne(() => Order, (order) => order.delivery)
  @JoinColumn({ name: 'orderId' })
  order: Order;
}
