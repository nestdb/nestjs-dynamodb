import { Inject } from '@nestjs/common';
import { DynamoDBClass } from './dynamodb.interfaces';
import { getModelToken, getModelForClass } from '../util';

export const InjectModel = (model: DynamoDBClass) => Inject(getModelToken(model.name));

export const ReturnModel = <T>(v?: any) => (false as true) && getModelForClass<T>(v, v, v, v);