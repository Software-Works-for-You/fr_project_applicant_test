import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {CreateClientArgs} from "./dto/create.client.args";
import {UpdateClientArgs} from "./dto/update.client.args";
import {ClientEntity} from "../database/postgres/entities";
import {plainToInstance} from "class-transformer";
import {ClientModel} from "./models/client.model";

@Injectable()
export class ClientService {
    constructor(
        @InjectRepository(ClientEntity)
        private clientRepository: Repository<ClientEntity>,
    ) {
    }

    async create(createClientArgs: CreateClientArgs): Promise<ClientModel> {
        const client = this.clientRepository.create(createClientArgs);
        const savedClient = await this.clientRepository.save(client);
        return plainToInstance(ClientModel, savedClient);
    }

    async findAll(): Promise<ClientModel[]> {
        const clients = await this.clientRepository.find({ relations: ['invoices'] });
        return clients.map(client => plainToInstance(ClientModel, client));
    }

    async findOne(id: string): Promise<ClientModel> {
        const client = await this.clientRepository.findOne({
            where: {id},
            relations: ['invoices']
        });
        if (!client) {
            throw new NotFoundException(`Client with ID "${id}" not found`);
        }
        return plainToInstance(ClientModel, client);

    }

    async update(id: string, updateClientArgs: UpdateClientArgs): Promise<ClientModel> {
        await this.clientRepository.update(id, updateClientArgs);
        const client =  this.findOne(id);
        return plainToInstance(ClientModel,client)
    }

    async delete(id: string): Promise<void> {
        await this.clientRepository.delete(id);
    }
}