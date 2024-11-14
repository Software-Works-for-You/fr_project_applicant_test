import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { InvoiceModel } from './models/invoice.model';
import { UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from '../common/exception/handler';
import { InvoiceService } from './invoice.service';
import {
  CreateInvoiceFailure,
  CreateInvoiceSuccess,
  CreateInvoiceUnion,
} from './models/create/create.invoice.model';
import { CreateInvoiceArgs } from './dto/create.invoice.args';
import { InvoiceNotFoundException } from '../common/exception/invoice.exception';
import { GetByIdArgs } from '../common/dto/get.by.id';
import {
  GetInvoiceFailure,
  GetInvoiceSuccess,
  GetInvoiceUnion,
} from './models/getById/get.invoice';
import {GetInvoicesByClientArgs} from "./dto/get.by.client.args";

@Resolver(() => InvoiceModel)
export class InvoiceResolver {
  constructor(private readonly service: InvoiceService) {}

  @Query(() => GetInvoiceUnion)
  @UseFilters(new HttpExceptionFilter(GetInvoiceFailure))
  public async getQuote(
    @Args('args', { type: () => GetByIdArgs }) args: GetByIdArgs,
  ) {
    try {
      const data = await this.service.findById({
        id: args.id,
      });

      if (data) {
        return new GetInvoiceSuccess(data);
      }
      throw new InvoiceNotFoundException();
    } catch (e) {
      return new GetInvoiceFailure({ message: e.message });
    }
  }

  @Mutation(() => CreateInvoiceUnion)
  public async createInvoice(
      @Args('args', { type: () => CreateInvoiceArgs }) args: CreateInvoiceArgs,
  ) {
    try {
      const data = await this.service.create(args);

      if (data) {
        return new CreateInvoiceSuccess(data);
      }

      throw new InvoiceNotFoundException();
    } catch (e) {
      return new CreateInvoiceFailure({ message: e.message });
    }
  }


  @Query(() => [InvoiceModel], { description: 'Get invoices by client ID' })
  @UseFilters(new HttpExceptionFilter(CreateInvoiceFailure))
  public async getInvoicesByClient(
      @Args('args', { type: () => GetInvoicesByClientArgs }) args: GetInvoicesByClientArgs,
  ): Promise<InvoiceModel[]> {
    return this.service.findByClientId(args.clientId);
  }

}
