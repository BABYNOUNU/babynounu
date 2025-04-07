import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Message } from './models/message.model';

export const MessageProviders = [
  {
    provide: 'MESSAGE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Message),
    inject: ['DATA_SOURCE'],
  },
];
