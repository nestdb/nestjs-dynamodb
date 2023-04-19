import { Provider } from '@nestjs/common';
import { DynamoDBRepository } from './dynamodb.repository';
import { DynamoDBService } from './dynamodb.service';

export function createDynamoDBProvider<T>(tableClass: new () => T): Provider {
  return {
    provide: `DynamoDBTable:${tableClass.name}`,
    useFactory: (dynamodbService: DynamoDBService) => {
      return new DynamoDBRepository<T>(dynamodbService, tableClass);
    },
    inject: [DynamoDBService],
  };
}
