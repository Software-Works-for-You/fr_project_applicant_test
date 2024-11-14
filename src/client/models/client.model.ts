import { BaseModel } from '../../common/models/base.model';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import {InvoiceModel} from "../../invoice/models/invoice.model";

@ObjectType()
export class ClientModel extends BaseModel {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;

  @Field(() => [InvoiceModel], { nullable: true, description: "Invoices linked to this client" })
  invoices?: InvoiceModel[];
}