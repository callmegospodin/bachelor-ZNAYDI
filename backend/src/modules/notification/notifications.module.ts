import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Notification } from './entities/notification.entity';
import { NotificationsList } from './entities/notificationsList.entity';
import { NotificationsController } from './notifications.controller';
import { NotificationsRepository } from './notifications.repository';
import { NotificationsService } from './notifications.service';
import { NotificationsListRepository } from './notificationsList.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Notification, NotificationsList])],
  controllers: [NotificationsController],
  providers: [NotificationsService, NotificationsListRepository, NotificationsRepository],
  exports: [NotificationsService],
})
export class NotificationsModule {}
