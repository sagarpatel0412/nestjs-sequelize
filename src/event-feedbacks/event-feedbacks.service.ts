import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventFeedbackInput } from './dto/create-event-feedback.input';
import { UpdateEventFeedbackInput } from './dto/update-event-feedback.input';
import { EventFeedbacksModel } from './model/event-feedbacks.model';
import { UserModel } from 'src/user/model/user.model';
import { EventsModel } from 'src/events/model/events.model';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class EventFeedbacksService {
  constructor(
    @InjectModel(EventFeedbacksModel)
    private eventsFeedbackModel: typeof EventFeedbacksModel,
    @InjectModel(UserModel) private userModel: typeof UserModel,
    @InjectModel(EventsModel) private eventsModel: typeof EventsModel,
    private sequelize: Sequelize,
  ) {}

  public async createEventsFeedback(
    feedback: CreateEventFeedbackInput,
  ): Promise<EventFeedbacksModel> {
    const userData = await this.userModel.findOne({
      where: { id: feedback.user_id },
    });
    if (!userData) {
      throw new NotFoundException(
        `user with this id ${feedback.user_id} doesnt exists`,
      );
    } else {
      const eventData = await this.eventsModel.findOne({
        where: { id: feedback.event_id },
      });
      if (!eventData) {
        throw new NotFoundException(
          `event with this id ${feedback.event_id} doesnt exists`,
        );
      } else {
        const feedbackData = new EventFeedbacksModel();
        feedbackData.title = feedback.title;
        feedbackData.description = feedback.description;
        feedbackData.status = feedback.status;
        feedbackData.user_id = feedback.user_id;
        feedbackData.event_id = feedback.event_id;

        const feedbackResult = await this.eventsFeedbackModel.create(
          feedbackData.dataValues,
        );
        return feedbackResult;
      }
    }
  }

  public async updateEventsFeedback(
    id: string,
    feedback: UpdateEventFeedbackInput,
  ): Promise<EventFeedbacksModel> {
    const feedbackData = await this.eventsFeedbackModel.findOne({
      where: { id },
    });
    if (!feedbackData) {
      throw new NotFoundException(`Feedback with id ${id} not found`);
    } else {
      feedbackData.title = feedback.title;
      feedbackData.description = feedback.description;
      feedbackData.status = feedback.status;
      await this.eventsFeedbackModel.update(feedbackData.dataValues, {
        where: { id },
      });
      return feedbackData;
    }
  }

  public async deleteEventsFeedback(id: string): Promise<EventFeedbacksModel> {
    const feedbackData = await this.eventsFeedbackModel.findOne({
      where: { id },
    });
    if (!feedbackData) {
      throw new NotFoundException(`Feedback with id ${id} not found`);
    } else {
      await this.eventsFeedbackModel.destroy({
        where: { id },
      });
      return feedbackData;
    }
  }

  public async getEventsFeedback(id: string): Promise<EventFeedbacksModel> {
    const feedbackData = await this.eventsFeedbackModel.findOne({
      where: { id },
    });
    if (feedbackData === null) {
      throw new NotFoundException(`No data found with this id`);
    } else {
      return feedbackData;
    }
  }

  public async getEventsFeedbacks(): Promise<Array<EventFeedbacksModel>> {
    const feedbackData = await this.eventsFeedbackModel.findAll();
    return feedbackData;
  }
}
