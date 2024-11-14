import {Field, InputType, ObjectType} from '@nestjs/graphql';
import { IsString, IsArray } from 'class-validator';
import {InvoiceModel} from "../models/invoice.model";

@InputType()
export class GetInvoicesByClientArgs {
    @Field()
    @IsString()
    clientId: string;
}

@ObjectType()
export class GetInvoicesByClientResponseDto {
    @Field(() => [InvoiceModel], { nullable: 'itemsAndList' })
    invoices: InvoiceModel[];
}