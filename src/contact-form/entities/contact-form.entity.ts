import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class ContactForm {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
