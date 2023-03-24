import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ContactFormService } from './contact-form.service';
import { ContactForm } from './entities/contact-form.entity';
import { CreateContactFormInput } from './dto/create-contact-form.input';
import { UpdateContactFormInput } from './dto/update-contact-form.input';
import { ContactFormModel } from './model/contact-form.model';
import { AllowUnauthorized } from 'src/auth/decorators/allow-unauthorized.decorator';

@Resolver(() => ContactForm)
export class ContactFormResolver {
  constructor(private readonly contactFormService: ContactFormService) {}

  @AllowUnauthorized()
  @Mutation(() => ContactFormModel)
  createContactForm(
    @Args('createContactFormInput')
    createContactFormInput: CreateContactFormInput,
  ) {
    return this.contactFormService.createContactForm(createContactFormInput);
  }

  @AllowUnauthorized()
  @Query(() => [ContactFormModel])
  getContactForms() {
    return this.contactFormService.getContactForms();
  }

  @AllowUnauthorized()
  @Query(() => ContactFormModel)
  getContactForm(@Args('id') id: string) {
    return this.contactFormService.getContactForm(id);
  }

  @AllowUnauthorized()
  @Mutation(() => ContactFormModel)
  updateContactForm(
    @Args('id') id: string,
    @Args('updateContactFormInput')
    updateContactFormInput: UpdateContactFormInput,
  ) {
    return this.contactFormService.updateContactForm(
      id,
      updateContactFormInput,
    );
  }

  @AllowUnauthorized()
  @Mutation(() => ContactFormModel)
  deleteContactForm(@Args('id') id: string) {
    return this.contactFormService.deleteContactForm(id);
  }
}
