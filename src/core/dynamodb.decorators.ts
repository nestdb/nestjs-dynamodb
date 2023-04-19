import 'reflect-metadata';
import { Inject } from '@nestjs/common';

export function Table(tableName: string): ClassDecorator {
  return (target: Function) => {
    Reflect.defineMetadata('table', tableName, target);
  };
}

export function HashKey(): PropertyDecorator {
  return (target: Object, propertyKey: string | symbol) => {
    Reflect.defineMetadata('hashKey', propertyKey, target);
  };
}

// Define other decorators like RangeKey, Attribute, etc.

export function InjectTable<T>(tableClass: new () => T): ParameterDecorator {
  return Inject(`DynamoDBTable:${tableClass.name}`);
}
