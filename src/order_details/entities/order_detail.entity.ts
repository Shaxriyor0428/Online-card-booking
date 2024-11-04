import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { OrderDetailsStatusEnum } from '../../common/types';

@Entity()
export class OrderDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  discountId: number;

  @Column()
  orderId: number;

  @Column()
  cardId: number;

  @Column()
  clientId: number;

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
}
