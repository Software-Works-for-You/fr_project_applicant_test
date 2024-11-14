import { Field, FieldOptions, InputType } from '@nestjs/graphql';
import {IsOptional, IsString} from 'class-validator';
import { LineItemsArgs } from './line.item.args';
import GraphQLJSON from 'graphql-type-json';

@InputType()
export class CreateInvoiceArgs {
  @Field(() => String, {
    nullable: true,
  } as FieldOptions<string>)
  @IsOptional()
  name?: string;

  @Field(() => [LineItemsArgs], {
    nullable: true,
  } as FieldOptions<[LineItemsArgs]>)
  @IsOptional()
  line_items?: LineItemsArgs[];

  @Field(() => GraphQLJSON, { nullable: true, name: 'customer_data' })
  @IsOptional()
  customerData?: object;

  @Field(() => String, { nullable: false })
  @IsString()
  clientId: string;
}
