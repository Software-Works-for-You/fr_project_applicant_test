import { Module } from '@nestjs/common';
import { AppController } from './probe/app.controller';
import { AppService } from './probe/app.service';
import { GraphQLModule, registerEnumType } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { InvoiceModule } from './invoice/invoice.module';
import { ErrorCode } from './common/enum/error.code';
import { DatabaseModule } from './database/postgres/modules/postgress.database';
import {dataSource} from "./database/postgres/providers/database.providers";
import {ClientModule} from "./client/client.module";
import {TypeOrmModule} from "@nestjs/typeorm";

registerEnumType(ErrorCode, {
  name: 'ErrorCode',
});
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        ...dataSource.options,
        autoLoadEntities: true,
      }),
    }),
    InvoiceModule,
    ClientModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
