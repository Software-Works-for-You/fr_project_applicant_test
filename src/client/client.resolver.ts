import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ClientService } from './client.service';
import { ClientModel } from './models/client.model';
import {UpdateClientArgs} from "./dto/update.client.args";
import {CreateClientArgs} from "./dto/create.client.args";

@Resolver(() => ClientModel)
export class ClientResolver {
  constructor(private readonly clientService: ClientService) {}

  @Query(() => [ClientModel], { name: 'clients' })
  public async findAll(): Promise<ClientModel[]> {
    return this.clientService.findAll();
  }

  @Query(() => ClientModel, { name: 'client' })
  public async findOne(@Args('id', { type: () => String }) id: string): Promise<ClientModel> {
    return this.clientService.findOne(id);
  }

  @Mutation(() => ClientModel, { name: 'createClient' })
  public async create(@Args('data') data: CreateClientArgs): Promise<ClientModel> {
    return this.clientService.create(data);
  }

  @Mutation(() => ClientModel, { name: 'updateClient' })
  public async update(
      @Args('id', { type: () => String }) id: string,
      @Args('data') data: UpdateClientArgs,
  ): Promise<ClientModel> {
    return this.clientService.update(id, data);
  }

  @Mutation(() => Boolean, { name: 'removeClient' })
  public async remove(@Args('id', { type: () => String }) id: string): Promise<boolean> {
    await this.clientService.delete(id);
    return true;
  }
}