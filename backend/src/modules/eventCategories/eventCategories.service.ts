import { Injectable, Logger } from '@nestjs/common';

import { EventCategoriesRepository } from './eventCategories.repository';

@Injectable()
export class EventsService {
  private readonly logger = new Logger(EventsService.name);
  constructor(private readonly eventCategoryRepository: EventCategoriesRepository) {}
}
