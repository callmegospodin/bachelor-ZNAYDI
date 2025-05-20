import { Controller, Get, Logger } from '@nestjs/common';

import { EventCategoriesService } from './eventCategories.service';

@Controller('event/categories')
export class EventCategoriesController {
  private readonly logger = new Logger(EventCategoriesController.name);
  constructor(private readonly categoryService: EventCategoriesService) {}

  @Get()
  async getAllCategories() {
    this.logger.log('Get list Categories');

    return this.categoryService.getAllCategories();
  }
}
