import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { NotificationsList } from './entities/notificationsList.entity';

@Injectable()
export class NotificationsListRepository extends Repository<NotificationsList> {
  private readonly logger = new Logger(NotificationsListRepository.name);

  constructor(@InjectRepository(NotificationsList) repository: Repository<NotificationsList>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
