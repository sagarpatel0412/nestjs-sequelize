import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SubscriptionFormService } from './subscription-form.service';
import { SubscriptionForm } from './entities/subscription-form.entity';
import { CreateSubscriptionFormInput } from './dto/create-subscription-form.input';
import { UpdateSubscriptionFormInput } from './dto/update-subscription-form.input';
import { SubscriptionFormModel } from './model/subscription-form.model';
import { AllowUnauthorized } from 'src/auth/decorators/allow-unauthorized.decorator';

@Resolver(() => SubscriptionForm)
export class SubscriptionFormResolver {
  constructor(
    private readonly subscriptionFormService: SubscriptionFormService,
  ) {}

  @AllowUnauthorized()
  @Mutation(() => SubscriptionFormModel)
  createSubscriptionForm(
    @Args('createSubscriptionFormInput')
    createSubscriptionFormInput: CreateSubscriptionFormInput,
  ) {
    return this.subscriptionFormService.createSubscriptionForm(
      createSubscriptionFormInput,
    );
  }

  @AllowUnauthorized()
  @Query(() => [SubscriptionFormModel])
  getSubscriptionForms() {
    return this.subscriptionFormService.getSubscriptionForms();
  }

  @AllowUnauthorized()
  @Query(() => SubscriptionFormModel)
  getSubscriptionForm(@Args('id') id: string) {
    return this.subscriptionFormService.getSubscriptionForm(id);
  }

  @AllowUnauthorized()
  @Mutation(() => SubscriptionFormModel)
  updateSubscriptionForm(
    @Args('updateSubscriptionFormInput')
    updateSubscriptionFormInput: UpdateSubscriptionFormInput,
    @Args('id') id: string,
  ) {
    return this.subscriptionFormService.updateSubscriptionForm(
      id,
      updateSubscriptionFormInput,
    );
  }

  @AllowUnauthorized()
  @Mutation(() => SubscriptionFormModel)
  deleteSubscriptionForm(@Args('id') id: string) {
    return this.subscriptionFormService.deleteSubscriptionForm(id);
  }
}
