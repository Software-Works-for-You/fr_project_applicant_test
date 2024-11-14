import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import { IsNumber, IsString } from 'class-validator';
import {ClientEntity} from "./client.entity";

@Entity('invoices')
export class InvoiceEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: true })
  name?: string;

  @Column({ type: 'jsonb', nullable: true })
  line_items?: LineItems[];

  @Column({ type: 'jsonb', nullable: true, name: 'customer_data' })
  customerData?: object;

  @ManyToOne(() => ClientEntity, (client) => client.invoices, { nullable: false })
  @JoinColumn({ name: 'client_id' })
  client: ClientEntity;

  @Column({ type: 'uuid' })
  client_id: string;
}

export class LineItems {
  @IsString()
  description: string;

  @IsNumber({ allowNaN: false, allowInfinity: false })
  amount: number;

  @IsNumber({ allowNaN: false, allowInfinity: false })
  price: number;

  @IsNumber({ allowNaN: false, allowInfinity: false })
  units: number;

  @IsNumber({ allowNaN: false, allowInfinity: false })
  vat: number;
}
