import { Injectable, Logger } from '@nestjs/common';

import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { FeedbacksRepository } from './feedbacks.repository';

@Injectable()
export class FeedbackService {
  private readonly logger = new Logger(FeedbackService.name);
  constructor(private readonly feedbackRepository: FeedbacksRepository) {}

  async createFeedback(data: CreateFeedbackDto): Promise<void> {
    this.logger.log('Creating new Event');

    await this.feedbackRepository.createOne(data);
  }

  async getAllFeedbacks(eventId: string) {
    //query params

    return this.feedbackRepository.getAll(eventId);
  }
}
