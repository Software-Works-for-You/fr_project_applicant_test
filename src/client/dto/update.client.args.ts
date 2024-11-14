import {InputType, PartialType} from '@nestjs/graphql';
import {CreateClientArgs} from "./create.client.args";

@InputType()
export class UpdateClientArgs extends PartialType(CreateClientArgs) {}