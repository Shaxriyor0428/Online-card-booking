import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { NotificationTypes } from '../../common/types';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  clientId: number;

  @Column({ type: 'varchar' })
  message: string;

  @Column({ type: 'boolean', default: false })
  is_read: boolean;

  @Column({
    type: 'enum',
    enum: NotificationTypes,
    default: NotificationTypes.ALERT,
  })
  type: NotificationTypes;

  @Column({
    type: 'varchar',
  })
  message_sent_time: string;
}
