import { Module } from '@nestjs/common';
import { ContactFormService } from './contact-form.service';
import { ContactFormResolver } from './contact-form.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { ContactFormModel } from './model/contact-form.model';

@Module({
  imports: [SequelizeModule.forFeature([ContactFormModel])],
  providers: [ContactFormResolver, ContactFormService],
})
export class ContactFormModule {}
