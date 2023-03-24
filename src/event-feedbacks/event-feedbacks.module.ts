import { Module } from '@nestjs/common';
import { EventFeedbacksService } from './event-feedbacks.service';
import { EventFeedbacksResolver } from './event-feedbacks.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from 'src/user/model/user.model';
import { EventsModel } from 'src/events/model/events.model';
import { EventFeedbacksModel } from './model/event-feedbacks.model';

@Module({
  imports: [
    SequelizeModule.forFeature([EventFeedbacksModel, UserModel, EventsModel]),
  ],
  providers: [EventFeedbacksResolver, EventFeedbacksService],
})
export class EventFeedbacksModule {}
