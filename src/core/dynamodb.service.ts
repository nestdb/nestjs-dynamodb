import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { Injectable, Inject } from '@nestjs/common';
import { DynamoDBModuleOptions } from './dynamodb.module';

@Injectable()
export class DynamoDBService {
  private readonly ddbDocClient: DynamoDBDocumentClient;

  constructor(@Inject('DYNAMODB_MODULE_OPTIONS') options: DynamoDBModuleOptions) {
    const client = new DynamoDBClient(options.dynamoDBOptions ?? {});
    this.ddbDocClient = DynamoDBDocumentClient.from(client);
  }

  getClient(): DynamoDBDocumentClient {
    return this.ddbDocClient;
  }
}
