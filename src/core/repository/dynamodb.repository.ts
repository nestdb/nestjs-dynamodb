import 'reflect-metadata';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
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
}
