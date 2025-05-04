import { FollowersList } from '@modules/folowers/entities/followersList.entity';
import { FollowersListRepository } from '@modules/folowers/followersList.repository';
import { Role } from '@modules/roles/entities/role.entity';
import { RolesRepository } from '@modules/roles/roles.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, FollowersList])],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, RolesRepository, FollowersListRepository],
  exports: [UsersService],
})
export class UsersModule {}
