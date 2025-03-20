import { Injectable } from '@nestjs/common';
import {  Rooms } from './models/rooms.model';
import { Message } from './models/message.model';

export const ChatProviders = [
    {
        provide: 'MESSAGE_REPOSITORY',
        useFactory: (dataSource: any) => dataSource.getRepository(Message),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'ROOMS_REPOSITORY',
        useFactory: (dataSource: any) => dataSource.getRepository(Rooms),
        inject: ['DATA_SOURCE'],
    }
]
