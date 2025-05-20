import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EventCategory } from './entities/eventCategory.entity';
import { EventCategoriesController } from './eventCategories.controller';
import { EventCategoriesRepository } from './eventCategories.repository';
import { EventCategoriesService } from './eventCategories.service';

@Module({
  imports: [TypeOrmModule.forFeature([EventCategory])],
  controllers: [EventCategoriesController],
  providers: [EventCategoriesService, EventCategoriesRepository],
  exports: [EventCategoriesService],
})
export class EventCategoriesModule {}
