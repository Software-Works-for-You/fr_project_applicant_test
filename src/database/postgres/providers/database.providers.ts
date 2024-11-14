import { DataSource } from 'typeorm';
import {ClientTable1731422100037, InvoiceTable1731422100036} from '../migrations';
import { InvoiceEntity } from '../entities';
import { ClientEntity } from '../entities';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'root',
  password: 'root',
  database: 'swfy',
  entities: [InvoiceEntity,ClientEntity],
  migrations: [InvoiceTable1731422100036,ClientTable1731422100037],
  synchronize: false,
});

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      return dataSource.initialize();
    },
  },
];
