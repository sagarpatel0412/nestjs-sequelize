import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSubscriptionFormInput } from './dto/create-subscription-form.input';
import { UpdateSubscriptionFormInput } from './dto/update-subscription-form.input';
import { InjectModel } from '@nestjs/sequelize';
import { SubscriptionFormModel } from './model/subscription-form.model';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class SubscriptionFormService {
  constructor(
    @InjectModel(SubscriptionFormModel) private subscriptionFormModel,
    private sequelize: Sequelize,
  ) {}

  public async createSubscriptionForm(
    inputs: CreateSubscriptionFormInput,
  ): Promise<SubscriptionFormModel> {
    const emailInput = this.normalizeEmail(inputs.email);
    const getContactUser = await this.subscriptionFormModel.findOne({
      where: { email: emailInput },
    });
    if (getContactUser) {
      throw new ConflictException(`${emailInput} is already contacted`);
    } else {
      const subscriptionInput = new SubscriptionFormModel();
      subscriptionInput.email = emailInput;
      subscriptionInput.status = inputs.status;
      subscriptionInput.is_sent_email = inputs.is_sent_email;
      const subscriptionContent = await this.subscriptionFormModel.create(
        subscriptionInput.dataValues,
      );
      return subscriptionContent;
    }
  }

  public async getSubscriptionForms(): Promise<Array<SubscriptionFormModel>> {
    const isSubThere = await this.subscriptionFormModel.findAll();
    return isSubThere;
  }

  public async getSubscriptionForm(id: string): Promise<SubscriptionFormModel> {
    const isSubThere = await this.subscriptionFormModel.findOne({
      where: { id },
    });
    return isSubThere;
  }

  public async updateSubscriptionForm(
    id: string,
    inputs: UpdateSubscriptionFormInput,
  ): Promise<SubscriptionFormModel> {
    const isSubThere = await this.subscriptionFormModel.findOne({
      where: { id },
    });
    if (!isSubThere) {
      throw new NotFoundException(`contact with ${id} not found`);
    } else {
      isSubThere.email = this.normalizeEmail(inputs.email);
      isSubThere.status = inputs.status;
      await this.subscriptionFormModel.update(isSubThere.dataValues, {
        where: { id },
      });
      return isSubThere;
    }
  }

  public async deleteSubscriptionForm(
    id: string,
  ): Promise<SubscriptionFormModel> {
    const isSubThere = await this.subscriptionFormModel.findOne({
      where: { id },
    });
    if (!isSubThere) {
      throw new NotFoundException(`contact with ${id} not found`);
    } else {
      await this.subscriptionFormModel.destroy({
        where: { id },
      });
      return isSubThere;
    }
  }

  public normalizeEmail(email: string): string {
    return email.trim().toLowerCase();
  }
}
