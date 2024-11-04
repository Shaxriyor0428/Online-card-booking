import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  full_name: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar', unique: true })
  phone_number: string;

  @Column({ type: 'varchar' })
  hashed_password: string;

  @Column({ type: 'varchar', nullable: true })
  hashed_refresh_token?: string;

  @Column({ type: 'varchar' })
  role: string;
}
