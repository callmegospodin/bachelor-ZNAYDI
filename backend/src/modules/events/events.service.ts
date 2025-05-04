import { Injectable, Logger } from '@nestjs/common';

import { EventsRepository } from './events.repository';

@Injectable()
export class EventsService {
  private readonly logger = new Logger(EventsService.name);
  constructor(private readonly eventRepository: EventsRepository) {}
}
