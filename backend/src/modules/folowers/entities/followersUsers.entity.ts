import { Entity, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';

import { FollowersList } from './followersList.entity';

@Entity({ name: 'followers_users' })
export class FollowersUsers {
  @PrimaryColumn({
    name: 'user_id',
    type: 'uuid',
    nullable: false,
  })
  userId: string;

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

  @ManyToOne(() => FollowersList, (followersList) => followersList.id)
  @JoinColumn({ name: 'followers_list_id' })
  followersListId: string;
}
