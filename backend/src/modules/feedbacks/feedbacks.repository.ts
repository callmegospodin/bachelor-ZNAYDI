import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Feedback } from './entities/feedback.entity';

@Injectable()
export class FeedbacksRepository extends Repository<Feedback> {
  private readonly logger = new Logger(FeedbacksRepository.name);

  constructor(@InjectRepository(Feedback) repository: Repository<Feedback>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
