import { Controller, Logger } from '@nestjs/common';

@Controller('events')
export class EventsController {
  private readonly logger = new Logger(EventsController.name);
  constructor() {}
}
