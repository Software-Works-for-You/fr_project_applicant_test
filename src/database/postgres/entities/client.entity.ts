import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { InvoiceEntity } from './invoice.entity';

@Entity('clients')
export class ClientEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    email: string;

    @OneToMany(() => InvoiceEntity, (invoice) => invoice.client)
    invoices: InvoiceEntity[];
}