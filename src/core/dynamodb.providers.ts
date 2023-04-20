import { Provider } from '@nestjs/common';
import { DynamoDBService } from './dynamodb.service';
import { DynamoDBRepository } from './repository/dynamodb.repository';

export function createDynamoDBProvider<T>(tableClass: new () => T): Provider {
  return {
    provide: `DynamoDBTable:${tableClass.name}`,
    useFactory: (dynamodbService: DynamoDBService) => {
      return new DynamoDBRepository<T>(dynamodbService, tableClass);
    },
    inject: [DynamoDBService],
  };
}
