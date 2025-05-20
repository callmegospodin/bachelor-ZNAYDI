import { Injectable, Logger } from '@nestjs/common';

import { EventCategoriesRepository } from './eventCategories.repository';

@Injectable()
export class EventCategoriesService {
  private readonly logger = new Logger(EventCategoriesService.name);
  constructor(private readonly eventCategoryRepository: EventCategoriesRepository) {}

  async getAllCategories() {
    //query params

    return this.eventCategoryRepository.getAll();
  }
}
