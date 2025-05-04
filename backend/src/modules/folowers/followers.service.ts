import { Injectable, Logger } from '@nestjs/common';

import { FollowersListRepository } from './followersList.repository';

@Injectable()
export class FollowersService {
  private readonly logger = new Logger(FollowersService.name);
  constructor(private readonly followerRepository: FollowersListRepository) {}
}
