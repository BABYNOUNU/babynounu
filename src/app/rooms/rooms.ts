import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Room } from './models/room.model';

export const RoomProviders = [
  {
    provide: 'ROOMS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Room),
    inject: ['DATA_SOURCE'],
  },
];
