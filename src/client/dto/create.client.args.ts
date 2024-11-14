import { Field, FieldOptions, InputType } from '@nestjs/graphql';
import {IsEmail, IsString} from 'class-validator';

@InputType()
export class CreateClientArgs {
  @Field(() => String, {
    nullable: false,
  } as FieldOptions<string>)
  @IsString()
  name: string;

  @Field(() => String, {
    nullable: false,
  } as FieldOptions<string>)
  @IsEmail()
  email: string;
}


