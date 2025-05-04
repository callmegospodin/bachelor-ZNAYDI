import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FollowersList } from './entities/followersList.entity';
import { FollowersUsers } from './entities/followersUsers.entity';
import { FollowersController } from './followers.controller';
import { FollowersService } from './followers.service';
import { FollowersListRepository } from './followersList.repository';

@Module({
  imports: [TypeOrmModule.forFeature([FollowersList, FollowersUsers])],
  controllers: [FollowersController],
  providers: [FollowersService, FollowersListRepository],
  exports: [FollowersService],
})
export class FollowersModule {}
