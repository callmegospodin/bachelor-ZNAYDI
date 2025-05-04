import { Controller, Logger } from '@nestjs/common';

@Controller('event/categories')
export class EventCategoriesController {
  private readonly logger = new Logger(EventCategoriesController.name);
  constructor() {}
}
