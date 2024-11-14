import {Injectable, NotFoundException} from '@nestjs/common';
import { CreateInvoiceArgs } from './dto/create.invoice.args';
import { InjectRepository } from '@nestjs/typeorm';
import { InvoiceModel } from './models/invoice.model';
import { plainToInstance } from 'class-transformer';
import {ClientEntity, InvoiceEntity} from "../database/postgres/entities";
import {Repository} from "typeorm";

@Injectable()
export class InvoiceService {

  constructor(
      @InjectRepository(InvoiceEntity)
      private readonly invoiceRepository: Repository<InvoiceEntity>,
      @InjectRepository(ClientEntity)
      private readonly clientRepository: Repository<ClientEntity>,
  ) {}

  public async findById({ id }: { id: string }) {
    const invoice: InvoiceModel = {
      id: id,
      name: 'Invoice',
      status: 'Draft',
      quoteNumber: '1',
      lineItems: [],
      deletedAt: null,
      issuedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      client: null,
      client_id: null,
    };

    return plainToInstance(InvoiceModel, invoice);
  }

  async create(args: CreateInvoiceArgs): Promise<InvoiceModel> {
    const { name, line_items, clientId } = args;

    const client = await this.clientRepository.findOne({ where: { id: clientId } });
    if (!client) {
      throw new NotFoundException(`Client with ID "${clientId}" not found`);
    }

    const newInvoice = this.invoiceRepository.create({
      name,
      line_items,
      client,
    });
    const savedInvoice = await this.invoiceRepository.save(newInvoice);

    return plainToInstance(InvoiceModel, savedInvoice);
  }

  public async findByClientId(clientId: string): Promise<InvoiceModel[]> {
    const invoices = await this.invoiceRepository.find({
      where: { client_id: clientId },
      relations: ['client'],
    });

    return invoices.map((invoice) => plainToInstance(InvoiceModel, invoice));
  }
}
