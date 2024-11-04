import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OrderStatusEnum } from '../../common/types';
import { Delivery } from '../../delivery/entities/delivery.entity';

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
}
