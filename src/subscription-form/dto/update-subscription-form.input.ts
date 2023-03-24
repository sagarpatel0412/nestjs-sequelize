import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateSubscriptionFormInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  email: string;

  @IsNotEmpty()
  @IsBoolean()
  @Field(() => Boolean)
  status: boolean;

  @IsNotEmpty()
  @IsBoolean()
  @Field(() => Boolean)
  is_sent_email: boolean;
}
