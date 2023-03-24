import { Test, TestingModule } from '@nestjs/testing';
import { EventFeedbacksResolver } from './event-feedbacks.resolver';
import { EventFeedbacksService } from './event-feedbacks.service';

describe('EventFeedbacksResolver', () => {
  let resolver: EventFeedbacksResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventFeedbacksResolver, EventFeedbacksService],
    }).compile();

    resolver = module.get<EventFeedbacksResolver>(EventFeedbacksResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
