import 'reflect-metadata';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { mockClient } from 'aws-sdk-client-mock';
import {
  DynamoDBRepository,
  DynamoDBService,
  Table,
  HashKey,
} from '../../../src';

@Table('user')
class UserDto {
  @HashKey() userName!: string;
}

describe('DynamoDBRepository', () => {
  const dynamodbMock = mockClient(DynamoDBDocumentClient);
  let service: DynamoDBService;
  let repo: DynamoDBRepository<UserDto>;

  beforeEach(() => {
    service = new DynamoDBService({
      dynamoDBOptions: { region: 'eu-west-1' },
    });
    repo = new DynamoDBRepository<UserDto>(service, UserDto);
    Reflect.defineMetadata('table', 'user', UserDto);
  });

  afterEach(() => {
    dynamodbMock.reset();
  });

  it('should put an item', async () => {
    let user = new UserDto();
    user.userName = 'john.smith@gmail.com';
    dynamodbMock.on(PutCommand).resolves({
      ItemCollectionMetrics: {
        SizeEstimateRangeGB: [1],
      },
    });
    let res = await repo.put(user);
    expect(res.userName).toStrictEqual('john.smith@gmail.com');
  });
});
