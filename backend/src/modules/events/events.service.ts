import { Injectable, Logger } from '@nestjs/common';

import { CreateEventDto } from './dtos/create-event.dto';
import { EventsRepository } from './events.repository';

@Injectable()
export class EventsService {
  private readonly logger = new Logger(EventsService.name);
  constructor(private readonly eventRepository: EventsRepository) {}

  async createEvent(data: CreateEventDto): Promise<void> {
    this.logger.log('Creating new Event');

    // create chat
    // change user role
    // category check
    await this.eventRepository.createOne({ ...data, rating: 0 });
  }

  async getAllEvents() {
    //query params

    return this.eventRepository.getAll();
  }

  async getEventById(id: string) {
    return this.eventRepository.getEventById(id);
  }
}
