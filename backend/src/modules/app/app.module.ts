import { AuthModule } from '@modules/auth/auth.module';
import { CommonModule } from '@modules/common/common.module';
import { EventCategoriesModule } from '@modules/eventCategories/eventCategories.module';
import { EventsModule } from '@modules/events/events.module';
import { FeedbacksModule } from '@modules/feedbacks/feedbacks.module';
import { FollowersModule } from '@modules/folowers/followers.module';
import { NotificationsModule } from '@modules/notification/notifications.module';
import { RolesModule } from '@modules/roles/roles.module';
import { UsersModule } from '@modules/users/users.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CommonModule.forRoot(),
    AuthModule,
    UsersModule,
    RolesModule,
    FollowersModule,
    NotificationsModule,
    EventsModule,
    EventCategoriesModule,
    FeedbacksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
