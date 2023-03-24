import { Module } from '@nestjs/common';
import { SubscriptionFormService } from './subscription-form.service';
import { SubscriptionFormResolver } from './subscription-form.resolver';

@Module({
  providers: [SubscriptionFormResolver, SubscriptionFormService]
})
export class SubscriptionFormModule {}
