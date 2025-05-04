import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FollowersList } from './entities/followersList.entity';

@Injectable()
export class FollowersListRepository extends Repository<FollowersList> {
  private readonly logger = new Logger(FollowersListRepository.name);

  constructor(@InjectRepository(FollowersList) repository: Repository<FollowersList>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
