import { Logger } from '@nestjs/common';
import { MongoClient } from 'mongodb';

export const mongoClientFactory = async () => {
  const logger = new Logger('MongoClient');
  const url = 'mongodb://localhost:27017/nest';
  logger.log(`connecting to ${url}`);

  const client = new MongoClient(url);
  await client.connect();
  logger.log(`connected to ${url}`);
  return client;
};
