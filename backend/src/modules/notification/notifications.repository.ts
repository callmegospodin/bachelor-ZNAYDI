import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Notification } from './entities/notification.entity';

@Injectable()
export class NotificationsRepository extends Repository<Notification> {
  private readonly logger = new Logger(NotificationsRepository.name);

  constructor(@InjectRepository(Notification) repository: Repository<Notification>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
