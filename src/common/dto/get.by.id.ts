import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class GetByIdArgs {
  @Field(() => String)
  id: string;
}
