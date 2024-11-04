import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Card } from '../../cards/entities/card.entity';

@Entity('bank')
export class Banks {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  location: string;

  @Column()
  phone: string;

  @Column()
  website: string;

  @Column()
  description: string;

  @ManyToMany(() => Card, (card) => card.banks)
  cards: Card[];
}
