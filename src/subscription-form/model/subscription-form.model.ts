import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreatedAt,
  DataType,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

@ObjectType('SubscriptionFormModel')
@Table({ modelName: 'subscription_forms' })
export class SubscriptionFormModel extends Model<SubscriptionFormModel> {
  @Field(() => String)
  @Column({
    allowNull: false,
    primaryKey: true,
    type: DataType.UUIDV4,
    defaultValue: DataType.UUIDV4,
    unique: true,
  })
  id: string;

  @Field(() => String)
  @Column({
    allowNull: false,
    type: DataType.STRING,
    unique: true,
  })
  email: string;

  @Field(() => Boolean)
  @Column({
    allowNull: false,
    type: DataType.BOOLEAN,
  })
  status: boolean;

  @Field(() => Boolean)
  @Column({
    allowNull: false,
    type: DataType.BOOLEAN,
  })
  is_sent_email: boolean;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;
}
