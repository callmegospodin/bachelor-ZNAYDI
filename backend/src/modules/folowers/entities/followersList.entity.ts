import { CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { FollowersUsers } from './followersUsers.entity';

@Entity({
  name: 'followers_list',
})
export class FollowersList {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
  })
  id: string;

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

  @OneToMany(() => FollowersUsers, (followersUsers) => followersUsers.followersListId)
  followersUsers: FollowersUsers[];
}
