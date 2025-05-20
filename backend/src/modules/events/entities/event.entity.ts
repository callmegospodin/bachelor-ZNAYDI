import { EventCategory } from '@modules/eventCategories/entities/eventCategory.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'events',
})
export class Event {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
  })
  id: string;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  name: string;

  @Column({
    name: 'description',
    type: 'text',
    nullable: true,
  })
  description: string;

  @Column({
    name: 'content',
    type: 'text',
    nullable: true,
  })
  content: string;

  @Column({
    name: 'price',
    type: 'float',
    nullable: true,
  })
  price: number;

  @Column({
    name: 'date_time',
    type: 'timestamptz',
    nullable: true,
  })
  dateTime: string;

  @Column({
    name: 'type',
    type: 'varchar',
    nullable: true,
  })
  type: string;

  @Column({
    name: 'city',
    type: 'varchar',
    nullable: true,
  })
  city: string;

  @Column({
    name: 'address',
    type: 'varchar',
    nullable: true,
  })
  address: string;

  @Column({
    name: 'participants',
    type: 'smallint',
    nullable: true,
  })
  participants: number;

  @Column({
    name: 'rating',
    type: 'int',
    nullable: true,
  })
  rating: number;

  @Column({
    name: 'photo_url',
    type: 'text',
    nullable: true,
  })
  photoUrl: string;

  @Column({
    name: 'category_id',
    type: 'uuid',
    nullable: false,
  })
  categoryId: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    nullable: false,
  })
  createdAt: string;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    nullable: true,
  })
  updatedAt: string | null;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    nullable: true,
  })
  deletedAt: string | null;

  @ManyToOne(() => EventCategory, (category) => category.events, { eager: true })
  @JoinColumn({
    name: 'category_id',
  })
  category: EventCategory;
}
