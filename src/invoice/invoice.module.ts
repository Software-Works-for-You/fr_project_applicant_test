import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceResolver } from './invoice.resolver';
import {ClientEntity, InvoiceEntity} from "../database/postgres/entities";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forFeature([InvoiceEntity,ClientEntity]),
  ],
  providers: [InvoiceService, InvoiceResolver],
})
export class InvoiceModule {}
