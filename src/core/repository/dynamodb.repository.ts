import 'reflect-metadata';
import { DynamoDBDocumentClient, PutCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { DynamoDBService } from '../dynamodb.service';

type ExtractProps<T> = {
  [K in keyof T]: T[K];
};

export class DynamoDBRepository<T> {
  protected readonly ddbDocClient: DynamoDBDocumentClient;

  constructor(service: DynamoDBService, private readonly tableClass: new () => T) {
    this.ddbDocClient = service.getClient();
  }

  private getTableName(): string {
    return Reflect.getMetadata('table', this.tableClass);
  }

  protected convertToAttributeMap(item: ExtractProps<T>): Record<string, any> {
    const itemObj: Record<string, any> = {};

    for (const key of Object.keys(item)) {
      itemObj[key] = (item as any)[key];
    }

    return itemObj;
  }


  async put(item: T): Promise<T> {
    let Item = this.convertToAttributeMap(item as unknown as ExtractProps<T>);
    let command = new PutCommand({
      TableName: this.getTableName(),
      Item,
    });

    await this.ddbDocClient.send(command);
    return item;
  }

  async queryOne(keys: { [index: string]: any }, indexName?: string): Promise<T> {
    let keyNames = Object.keys(keys);
    let command = new QueryCommand({
      TableName: this.getTableName(),
      KeyConditionExpression: `#${keyNames[0]} = :${keyNames[0]} AND #${keyNames[1]} = :${keyNames[1]}`,
      ExpressionAttributeNames: {},
      ExpressionAttributeValues: {},
    });

    command.input.ExpressionAttributeNames![`#${keyNames[0]}`] = keyNames[0];
    command.input.ExpressionAttributeNames![`#${keyNames[1]}`] = keyNames[1];

    command.input.ExpressionAttributeValues![`:${keyNames[0]}`] = keys[keyNames[0]];
    command.input.ExpressionAttributeValues![`:${keyNames[1]}`] = keys[keyNames[1]];

    if (indexName) {
      command.input.IndexName = indexName;
    }

    const item = await this.ddbDocClient.send(command);
    return item.Items ? item.Items[0] as T : {} as T;
  }
}
