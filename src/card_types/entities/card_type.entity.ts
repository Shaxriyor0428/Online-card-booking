import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('card_type')
export class CardType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;
}
