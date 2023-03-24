import { InputType, Int, Field } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateContactFormInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  name: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  description: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  email: string;

  @IsNotEmpty()
  @IsBoolean()
  @Field(() => Boolean)
  status: boolean;
}
