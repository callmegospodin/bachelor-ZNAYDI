import { Injectable, Logger } from '@nestjs/common';

import { FeedbacksRepository } from './feedbacks.repository';

@Injectable()
export class FeedbackService {
  private readonly logger = new Logger(FeedbackService.name);
  constructor(private readonly feedbackRepository: FeedbacksRepository) {}
}
