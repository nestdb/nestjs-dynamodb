import { Injectable, Inject } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { DynamoDBModuleOptions } from './dynamodb.module';

@Injectable()
export class DynamoDBService {
  private readonly dynamoDB: AWS.DynamoDB;
  private readonly documentClient: AWS.DynamoDB.DocumentClient;

  constructor(@Inject('DYNAMODB_MODULE_OPTIONS') options: DynamoDBModuleOptions) {
    AWS.config.update(options.AWSConfig);
    this.dynamoDB = new AWS.DynamoDB(options.dynamoDBOptions);
    this.documentClient = new AWS.DynamoDB.DocumentClient(options.documentClientOptions);
  }

  // Expose the DynamoDB client and DocumentClient for further usage
  getDynamoDB(): AWS.DynamoDB {
    return this.dynamoDB;
  }

  getDocumentClient(): AWS.DynamoDB.DocumentClient {
    return this.documentClient;
  }
}
