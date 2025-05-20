import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateEventType } from './constants/events.types';
import { Event } from './entities/event.entity';

@Injectable()
export class EventsRepository extends Repository<Event> {
  private readonly logger = new Logger(EventsRepository.name);

  constructor(@InjectRepository(Event) repository: Repository<Event>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async createOne(data: CreateEventType): Promise<void> {
    try {
      await this.save(data);
    } catch (error) {
      this.logger.log('Creating event exception', error);

      throw new BadRequestException('Creating event exception');
    }
  }

  async getAll() {
    try {
      return await this.find();
    } catch (error) {
      this.logger.log('Get list events exception', error);

      throw new BadRequestException('Get list events exception');
    }
  }

  async getEventById(id: string) {
    try {
      return await this.findOne({ where: { id } });
    } catch (error) {
      this.logger.log('Get one events exception', error);

      throw new BadRequestException('Get one events exception');
    }
  }
}
