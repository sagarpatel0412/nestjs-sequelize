import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateContactFormInput } from './dto/create-contact-form.input';
import { UpdateContactFormInput } from './dto/update-contact-form.input';
import { InjectModel } from '@nestjs/sequelize';
import { ContactFormModel } from './model/contact-form.model';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class ContactFormService {
  constructor(
    @InjectModel(ContactFormModel)
    private contactFormModel: typeof ContactFormModel,
    private sequelize: Sequelize,
  ) {}

  public async createContactForm(
    inputs: CreateContactFormInput,
  ): Promise<ContactFormModel> {
    const emailInput = this.normalizeEmail(inputs.email);
    const getContactUser = await this.contactFormModel.findOne({
      where: { email: emailInput },
    });
    if (getContactUser) {
      throw new ConflictException(`${emailInput} is already contacted`);
    } else {
      const contactInput = new ContactFormModel();
      contactInput.email = emailInput;
      contactInput.description = inputs.description;
      contactInput.name = inputs.name;
      contactInput.status = inputs.status;
      const contactContent = await this.contactFormModel.create(
        contactInput.dataValues,
      );
      return contactContent;
    }
  }

  public async updateContactForm(
    id: string,
    inputs: UpdateContactFormInput,
  ): Promise<ContactFormModel> {
    const isContactThere = await this.contactFormModel.findOne({
      where: { id },
    });
    if (!isContactThere) {
      throw new NotFoundException(`contact with ${id} not found`);
    } else {
      isContactThere.email = this.normalizeEmail(inputs.email);
      isContactThere.status = inputs.status;
      isContactThere.name = inputs.name;
      isContactThere.description = inputs.description;
      await this.contactFormModel.update(isContactThere.dataValues, {
        where: { id },
      });
      return isContactThere;
    }
  }

  public async deleteContactForm(id: string): Promise<ContactFormModel> {
    const isContactThere = await this.contactFormModel.findOne({
      where: { id },
    });
    if (!isContactThere) {
      throw new NotFoundException(`contact with ${id} not found`);
    } else {
      await this.contactFormModel.destroy({
        where: { id },
      });
      return isContactThere;
    }
  }

  public async getContactForm(id: string): Promise<ContactFormModel> {
    const isContactThere = await this.contactFormModel.findOne({
      where: { id },
    });
    if (isContactThere === null) {
      throw new NotFoundException(`No data found with this id`);
    } else {
      return isContactThere;
    }
  }

  public async getContactForms(): Promise<Array<ContactFormModel>> {
    const isContactThere = await this.contactFormModel.findAll();
    return isContactThere;
  }

  public normalizeEmail(email: string): string {
    return email.trim().toLowerCase();
  }
}
