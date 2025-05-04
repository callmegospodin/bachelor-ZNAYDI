import { Controller, Logger } from '@nestjs/common';

@Controller('notifications')
export class NotificationsController {
  private readonly logger = new Logger(NotificationsController.name);
  constructor() {}
}
