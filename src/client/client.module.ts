import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientResolver } from './client.resolver';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClientEntity } from "../database/postgres/entities";

@Module({
  imports: [
    TypeOrmModule.forFeature([ClientEntity]),
  ],
  providers: [ClientService, ClientResolver],
})
export class ClientModule {}
