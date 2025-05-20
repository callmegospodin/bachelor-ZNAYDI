import { Body, Controller, Get, HttpCode, HttpStatus, Logger, Param, Post } from '@nestjs/common';

import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { FeedbackService } from './feedbacks.service';

@Controller('feedbacks')
export class FeedbacksController {
  private readonly logger = new Logger(FeedbacksController.name);
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createFeedback(@Body() body: CreateFeedbackDto): Promise<void> {
    this.logger.log('Creating Event');

    await this.feedbackService.createFeedback(body);
  }

  @Get(':eventId')
  async getAllFeedbacks(@Param('eventId') eventId: string) {
    this.logger.log('Get list Feedbacks');

    return this.feedbackService.getAllFeedbacks(eventId);
  }
}
