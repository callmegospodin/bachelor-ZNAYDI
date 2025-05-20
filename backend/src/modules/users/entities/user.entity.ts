import { FollowersList } from '@modules/folowers/entities/followersList.entity';
import { Role } from '@modules/roles/entities/role.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
  })
  id: string;

  @Column({
    name: 'email',
    type: 'varchar',
    length: 96,
    nullable: false,
  })
  email: string;

  @Column({
    name: 'password',
    type: 'varchar',
    nullable: false,
  })
  password: string;

  @Column({
    name: 'first_name',
    type: 'varchar',
    length: 60,
    nullable: false,
  })
  firstName: string;

  @Column({
    name: 'last_name',
    type: 'varchar',
    length: 60,
    nullable: false,
  })
  lastName: string;

  @Column({
    name: 'phone',
    type: 'varchar',
    length: 13,
    nullable: true,
  })
  phone: string;

  @Column({
    name: 'age',
    type: 'int',
    nullable: true,
  })
  age: number;

  @Column({
    name: 'photo_url',
    type: 'text',
    nullable: true,
  })
  photoUrl: string;

  @Column({
    name: 'about',
    type: 'text',
    nullable: true,
  })
  about: string;

  @Column({
    name: 'city',
    type: 'varchar',
    nullable: true,
  })
  city: string;

  @Column({
    name: 'role_id',
    type: 'uuid',
    nullable: false,
  })
  roleId: string;

  @Column({
    name: 'followers_list_id',
    type: 'uuid',
    nullable: false,
  })
  followersListId: string;

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

  @ManyToOne(() => Role, { eager: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @OneToOne(() => FollowersList, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'followers_list_id' })
  followersList: FollowersList;
}
