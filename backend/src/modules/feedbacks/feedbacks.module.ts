import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Feedback } from './entities/feedback.entity';
import { FeedbacksController } from './feedbacks.controller';
import { FeedbacksRepository } from './feedbacks.repository';
import { FeedbackService } from './feedbacks.service';

@Module({
  imports: [TypeOrmModule.forFeature([Feedback])],
  controllers: [FeedbacksController],
  providers: [FeedbackService, FeedbacksRepository],
  exports: [FeedbackService],
})
export class FeedbacksModule {}
