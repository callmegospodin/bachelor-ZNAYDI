import { Controller, Logger } from '@nestjs/common';

@Controller('feedbacks')
export class FeedbacksController {
  private readonly logger = new Logger(FeedbacksController.name);
  constructor() {}
}
