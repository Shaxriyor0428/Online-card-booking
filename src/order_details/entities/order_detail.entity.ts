import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderDetailsStatusEnum } from '../../common/types';
import { Order } from '../../orders/entities/order.entity';
import { Clients } from '../../clients/entities/client.entity';
import { Card } from '../../cards/entities/card.entity';

@Entity()
export class OrderDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  discountId: number;

  @Column()
  quantity: number;

  @Column({ type: 'float' })
  price: number;

  @Column({ type: 'float', nullable: true })
  total_price: number;

  @Column({
    type: 'enum',
    enum: OrderDetailsStatusEnum,
    default: OrderDetailsStatusEnum.PENDING,
  })
  status: string;

  @ManyToOne(() => Order, (order) => order.order_details)
  @JoinColumn({ name: 'orderId' })
  order: Order;

  @ManyToOne(() => Clients, (client) => client.order_details)
  @JoinColumn({ name: 'clientId' })
  client: Clients;

  @ManyToOne(() => Card, (card) => card.order_details)
  @JoinColumn({ name: 'cardId' })
  card: Card;
}
