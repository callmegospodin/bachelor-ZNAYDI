import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserType, GetListUsersOptions, SORT_ORDER } from './constants/user.types';
import { GetUserResponseType } from './dto/get-one-user.response.dto';
import { GetUserListResponseDto } from './dto/get-user-list.response.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersRepository extends Repository<User> {
  private readonly logger = new Logger(UsersRepository.name);

  constructor(@InjectRepository(User) repository: Repository<User>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async createOne(data: CreateUserType): Promise<void> {
    try {
      await this.save(data);
    } catch (error) {
      this.logger.log('Creating user exception', error);

      throw new BadRequestException('Creating user exception');
    }
  }

  async getOne(email: string): Promise<GetUserResponseType> {
    try {
      return await this.createQueryBuilder('u')
        .select(['u.id AS "id"', 'u.email AS "email"', 'u.phone AS "phone"', 'u.name AS "name"', 'u.photo AS "photo"'])
        .where('u.email = :email', {
          email,
        })
        .getRawOne();
    } catch (error) {
      this.logger.log('Selecting User exception', error);

      throw new BadRequestException('Selecting User exception');
    }
  }

  async getAuth(email: string): Promise<User> {
    try {
      return await this.findOne({ where: { email } });
    } catch (error) {
      this.logger.log('Selecting User exception', error);

      throw new BadRequestException('Selecting User exception');
    }
  }

  async getAll(options: GetListUsersOptions): Promise<GetUserListResponseDto> {
    try {
      const { count, offset = 0, sortDirection = SORT_ORDER.DESC, page } = options;

      const query = this.createQueryBuilder('u')
        .select(['u.id AS "id"', 'u.email AS "email"', 'u.phone AS "phone"', 'u.name AS "name"', 'u.photo AS "photo"'])
        .limit(count)
        .offset(page ? page * count : offset)
        .orderBy('u.created_date', sortDirection);

      const [data, totalUsers] = await Promise.all([query.getRawMany(), query.getCount()]);

      return { page, count, totalPages: Math.ceil(totalUsers / count), totalUsers, data };
    } catch (error) {
      this.logger.log('Selecting User exception', error);

      throw new BadRequestException('Selecting User exception');
    }
  }

  async updateOne(id: string, data: UpdateUserDto): Promise<void> {
    try {
      await this.update(id, data);
    } catch (error) {
      this.logger.log('Updating User exception', error);

      throw new BadRequestException('Updating User exception');
    }
  }

  async deleteOne(id: string): Promise<void> {
    try {
      await this.delete(id);
    } catch (error) {
      this.logger.log('Deleting User exception', error);

      throw new BadRequestException('Deleting User exception');
    }
  }
}
