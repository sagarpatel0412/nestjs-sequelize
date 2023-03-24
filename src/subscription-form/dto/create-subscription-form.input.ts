import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';

@InputType()
export class CreateSubscriptionFormInput {
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
