import { DynamicModule, Global, Module } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { createDynamoDBProvider } from './dynamodb.providers';
import { DynamoDBService } from './dynamodb.service';

export interface DynamoDBModuleOptions {
  AWSConfig: AWS.Config;
  dynamoDBOptions?: AWS.DynamoDB.Types.ClientConfiguration;
  documentClientOptions?: AWS.DynamoDB.DocumentClient.DocumentClientOptions & AWS.DynamoDB.Types.ClientApiVersions;
  tables?: any[];
}

@Global()
@Module({})
export class DynamoDBModule {
  static forRoot(options: DynamoDBModuleOptions): DynamicModule {
    // Create table providers
    const tableProviders = options.tables?.map(tableClass => createDynamoDBProvider(tableClass)) || [];

    return {
      module: DynamoDBModule,
      providers: [
        {
          provide: 'DYNAMODB_MODULE_OPTIONS',
          useValue: options,
        },
        DynamoDBService,
        ...tableProviders,
      ],
      exports: [DynamoDBService, ...tableProviders],
    };
  }
}
