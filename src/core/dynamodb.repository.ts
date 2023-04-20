import 'reflect-metadata';
import * as AWS from 'aws-sdk';
import { QueryInput, ScanInput, PutItemInput } from 'aws-sdk/clients/dynamodb';
import { DynamoDBService } from './dynamodb.service';

type ExtractProps<T> = {
  [K in keyof T]: T[K];
};

export class DynamoDBRepository<T> {
  protected readonly documentClient: AWS.DynamoDB.DocumentClient;

  constructor(service: DynamoDBService, private readonly tableClass: new () => T) {
    this.documentClient = service.getDocumentClient();
  }

  private getTableName(): string {
    return Reflect.getMetadata('table', this.tableClass);
  }

  private convertToAttributeMap(item: ExtractProps<T>): AWS.DynamoDB.DocumentClient.PutItemInputAttributeMap {
    return AWS.DynamoDB.Converter.marshall(item) as AWS.DynamoDB.DocumentClient.PutItemInputAttributeMap;
  }

  async put(item: T): Promise<T> {
    const input: PutItemInput = {
      TableName: this.getTableName(),
      Item: this.convertToAttributeMap(item as unknown as ExtractProps<T>),
    };

    await this.documentClient.put(input).promise();
    return item;
  }

  async query(params: QueryInput): Promise<T[]> {
    const input: QueryInput = { ...params };
    input.TableName = this.getTableName();

    const result = await this.documentClient.query(input).promise();
    return result.Items as T[];
  }

  async scan(params?: ScanInput): Promise<T[]> {
    const input: ScanInput = {
      TableName: this.getTableName(),
      ...params,
    };

    const result = await this.documentClient.scan(input).promise();
    return result.Items as T[];
  }

  // Add other methods like update, delete, etc.
}
