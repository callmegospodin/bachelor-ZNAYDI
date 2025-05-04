import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { EventCategory } from './entities/eventCategory.entity';

@Injectable()
export class EventCategoriesRepository extends Repository<EventCategory> {
  private readonly logger = new Logger(EventCategoriesRepository.name);

  constructor(@InjectRepository(EventCategory) repository: Repository<EventCategory>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
