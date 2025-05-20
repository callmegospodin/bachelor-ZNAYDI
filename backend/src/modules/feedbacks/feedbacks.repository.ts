import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Feedback } from './entities/feedback.entity';

@Injectable()
export class FeedbacksRepository extends Repository<Feedback> {
  private readonly logger = new Logger(FeedbacksRepository.name);

  constructor(@InjectRepository(Feedback) repository: Repository<Feedback>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async createOne(data): Promise<void> {
    try {
      await this.save(data);
    } catch (error) {
      this.logger.log('Creating feedback exception', error);

      throw new BadRequestException('Creating feedback exception');
    }
  }

  async getAll(eventId: string) {
    try {
      return await this.find({ where: { eventId } });
    } catch (error) {
      this.logger.log('Get list feedbacks exception', error);

      throw new BadRequestException('Get list feedbacks exception');
    }
  }
}
