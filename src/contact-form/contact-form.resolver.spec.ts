import { Test, TestingModule } from '@nestjs/testing';
import { ContactFormResolver } from './contact-form.resolver';
import { ContactFormService } from './contact-form.service';

describe('ContactFormResolver', () => {
  let resolver: ContactFormResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContactFormResolver, ContactFormService],
    }).compile();

    resolver = module.get<ContactFormResolver>(ContactFormResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
