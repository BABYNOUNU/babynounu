import { Injectable } from '@nestjs/common';
import { use } from 'passport';
import { Job } from './models/job.model';
import { DataSource } from 'typeorm';


export const JobProviders = [

    {
        provide: 'JOB_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Job),
        inject: ['DATA_SOURCE'],
    },
]
