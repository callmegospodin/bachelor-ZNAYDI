import { Injectable, Logger } from '@nestjs/common';

import { NotificationsRepository } from './notifications.repository';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);
  constructor(private readonly notificationRepository: NotificationsRepository) {}
}
