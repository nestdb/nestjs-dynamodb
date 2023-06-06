import { DynamoDBClientConfig } from '@aws-sdk/client-dynamodb';
import { DynamicModule, Global, Module } from '@nestjs/common';
import { createDynamoDBProvider } from './dynamodb.providers';
import { DynamoDBService } from './dynamodb.service';

export interface DynamoDBModuleOptions {
  dynamoDBOptions?: DynamoDBClientConfig;
  tables?: any[];
  prefix: string | null;
}

@Global()
@Module({})
export class DynamoDBModule {
  static forRoot(options: DynamoDBModuleOptions): DynamicModule {
    const tableProviders = options.tables?.map(tableClass => createDynamoDBProvider(tableClass, options.prefix)) || [];

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
