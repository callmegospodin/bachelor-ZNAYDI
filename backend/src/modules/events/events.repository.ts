import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Event } from './entities/event.entity';

@Injectable()
export class EventsRepository extends Repository<Event> {
  private readonly logger = new Logger(EventsRepository.name);

  constructor(@InjectRepository(Event) repository: Repository<Event>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
