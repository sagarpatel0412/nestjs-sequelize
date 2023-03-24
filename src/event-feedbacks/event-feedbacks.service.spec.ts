import { Test, TestingModule } from '@nestjs/testing';
import { EventFeedbacksService } from './event-feedbacks.service';

describe('EventFeedbacksService', () => {
  let service: EventFeedbacksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventFeedbacksService],
    }).compile();

    service = module.get<EventFeedbacksService>(EventFeedbacksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
