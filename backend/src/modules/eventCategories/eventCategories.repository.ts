import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { EventCategory } from './entities/eventCategory.entity';

@Injectable()
export class EventCategoriesRepository extends Repository<EventCategory> {
  private readonly logger = new Logger(EventCategoriesRepository.name);

  constructor(@InjectRepository(EventCategory) repository: Repository<EventCategory>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async getAll() {
    try {
      return await this.find();
    } catch (error) {
      this.logger.log('Get list categories exception', error);

      throw new BadRequestException('Get list categories exception');
    }
  }
}
