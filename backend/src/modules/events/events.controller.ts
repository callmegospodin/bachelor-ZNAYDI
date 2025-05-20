import { Body, Controller, Get, HttpCode, HttpStatus, Logger, Param, Post } from '@nestjs/common';

import { CreateEventDto } from './dtos/create-event.dto';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  private readonly logger = new Logger(EventsController.name);
  constructor(private readonly eventService: EventsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() body: CreateEventDto): Promise<void> {
    this.logger.log('Creating Event');

    await this.eventService.createEvent(body);
  }

  @Get()
  async getAllEvents() {
    this.logger.log('Get list Events');

    return this.eventService.getAllEvents();
  }

  @Get(':id')
  async getEventById(@Param('id') id: string) {
    this.logger.log('Get list Events');

    return this.eventService.getEventById(id);
  }
}
