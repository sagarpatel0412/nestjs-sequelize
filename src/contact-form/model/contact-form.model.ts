import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreatedAt,
  DataType,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

@ObjectType('ContactFormModel')
@Table({ modelName: 'contact_form' })
export class ContactFormModel extends Model<ContactFormModel> {
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
  })
  name: string;

  @Field(() => String)
  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  description: string;

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

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;
}
