import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Clients {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  regionId: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  phone_number: string;

  @Column({ type: 'boolean', default: false, nullable: true })
  is_active: boolean;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column()
  address: string;

  @Column()
  hashed_password: string;

  @Column({ type: 'varchar', nullable: true })
  hashed_refresh_token: string;

  @Column()
  photo: string;

  @Column({ type: 'varchar', nullable: true })
  passport_number: string;

  @Column('date')
  birth_date: string;

  @Column({ type: 'date', nullable: true })
  passport_issue_date: string;

  @Column({ type: 'date', nullable: true })
  passport_expiry_date: string;

  @Column({ type: 'boolean', default: false, nullable: true })
  verified: boolean;
}
