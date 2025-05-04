import { FollowersListRepository } from '@modules/folowers/followersList.repository';
import { RolesRepository } from '@modules/roles/roles.repository';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { seedRoles } from '@src/seeds/constants/defaultSeeder';
import * as bcrypt from 'bcrypt';

import { GetListUsersOptions } from './constants/user.types';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserResponseType } from './dto/get-one-user.response.dto';
import { GetUserListResponseDto } from './dto/get-user-list.response.dto';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly roleRepository: RolesRepository,
    private readonly followersListRepository: FollowersListRepository,
  ) {}

  async createUser(data: CreateUserDto): Promise<void> {
    this.logger.log('Creating new User');

    try {
      // if not exists
      // conflict exists
      const roleUser = await this.roleRepository.findOne({ where: { id: seedRoles[1].id } });
      const followersList = await this.followersListRepository.save({ followersUsers: [] });

      const hashedPassword = await bcrypt.hash(data.password, +process.env.SALT);

      await this.userRepository.createOne({
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data?.phone,
        age: data?.age,
        about: data?.about,
        city: data?.city,
        photoUrl: data?.photoUrl,
        password: hashedPassword,
        roleId: roleUser.id,
        followersListId: followersList.id,
      });
    } catch (error) {
      this.logger.log('Creating user exception', error);

      throw new BadRequestException('Creating user exception', error);
    }
  }

  async getOneUser(email: string): Promise<GetUserResponseType> {
    this.logger.log('Getting User');

    return this.userRepository.getOne(email);
  }

  async getAuthUser(email: string): Promise<User> {
    this.logger.log('Getting Auth User');

    return this.userRepository.getAuth(email);
  }

  async getAllUsers(options: GetListUsersOptions): Promise<GetUserListResponseDto> {
    this.logger.log('Getting User List');

    return this.userRepository.getAll(options);
  }

  // async updateUser(id: string, data: UpdateUserDto): Promise<void> {
  //   this.logger.log('Updating User');

  //   return this.userRepository.updateOne(id, {
  //     name: data.name,
  //     positionId: data.positionId,
  //     phone: data.phone,
  //   });
  // }

  async deleteUser(id: string): Promise<void> {
    this.logger.log('Deleting User');

    return this.userRepository.deleteOne(id);
  }
}
