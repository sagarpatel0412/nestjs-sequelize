import { Module } from '@nestjs/common';
import { SubscriptionFormService } from './subscription-form.service';
import { SubscriptionFormResolver } from './subscription-form.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { SubscriptionFormModel } from './model/subscription-form.model';

@Module({
  imports: [SequelizeModule.forFeature([SubscriptionFormModel])],
  providers: [SubscriptionFormResolver, SubscriptionFormService],
})
export class SubscriptionFormModule {}
