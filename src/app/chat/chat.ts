import { Injectable } from '@nestjs/common';
import { ChatMessages } from './models/chat.model';

export const ChatProviders = [
    {
        provide: 'CHAT_REPOSITORY',
        useFactory: (dataSource: any) => dataSource.getRepository(ChatMessages),
        inject: ['DATA_SOURCE'],
    },
]
