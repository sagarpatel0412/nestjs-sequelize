import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { EventFeedbacksService } from './event-feedbacks.service';
import { EventFeedback } from './entities/event-feedback.entity';
import { CreateEventFeedbackInput } from './dto/create-event-feedback.input';
import { UpdateEventFeedbackInput } from './dto/update-event-feedback.input';
import { EventFeedbacksModel } from './model/event-feedbacks.model';
import { AllowUnauthorized } from 'src/auth/decorators/allow-unauthorized.decorator';

@Resolver(() => EventFeedback)
export class EventFeedbacksResolver {
  constructor(private readonly eventsFeedbackService: EventFeedbacksService) {}

  @AllowUnauthorized()
  @Mutation(() => EventFeedbacksModel)
  createEventsFeedback(
    @Args('createEventsFeedbackInput')
    createEventsFeedbackInput: CreateEventFeedbackInput,
  ) {
    return this.eventsFeedbackService.createEventsFeedback(
      createEventsFeedbackInput,
    );
  }

  @AllowUnauthorized()
  @Mutation(() => EventFeedbacksModel)
  updateEventsFeedback(
    @Args('id') id: string,
    @Args('updateEventsFeedbackInput')
    updateEventsFeedbackInput: UpdateEventFeedbackInput,
  ) {
    return this.eventsFeedbackService.updateEventsFeedback(
      id,
      updateEventsFeedbackInput,
    );
  }

  @AllowUnauthorized()
  @Mutation(() => EventFeedbacksModel)
  deleteEventsFeedback(@Args('id') id: string) {
    return this.eventsFeedbackService.deleteEventsFeedback(id);
  }

  @AllowUnauthorized()
  @Query(() => EventFeedbacksModel)
  getEventsFeedback(@Args('id') id: string) {
    return this.eventsFeedbackService.getEventsFeedback(id);
  }

  @AllowUnauthorized()
  @Query(() => [EventFeedbacksModel])
  getEventsFeedbacks() {
    return this.eventsFeedbackService.getEventsFeedbacks();
  }
}
