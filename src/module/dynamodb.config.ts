import { DataMapper } from '@aws/dynamodb-data-mapper';
import * as AWS from 'aws-sdk';
import DynamoDB from 'aws-sdk/clients/dynamodb';
import { DynamoDBModuleOptions } from './dynamodb.interfaces';

export const createDynamodbClient = (options: DynamoDBModuleOptions): DynamoDB => {
  AWS.config.update(options.AWSConfig);
  return new DynamoDB(options.dynamoDBOptions);
};

export const createMapper = (dynamoDBClient: DynamoDB, tableNamePrefix?: string): DataMapper =>
  new DataMapper({
    client: dynamoDBClient,
    tableNamePrefix,
  });