import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Discount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column({ type: 'float' })
  discount_percentage: number;

  @Column({ type: 'date' })
  expire_date: string;

  @Column({ type: 'boolean', default: false, nullable: true })
  is_active: boolean;
}
