import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Rooms } from './models/room.model';
import { RoomMessageCount } from './models/unreadCount.model';

export const RoomProviders = [
  {
    provide: 'ROOMS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Rooms),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'UNREAD_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(RoomMessageCount),
    inject: ['DATA_SOURCE'],
  },
  
];
