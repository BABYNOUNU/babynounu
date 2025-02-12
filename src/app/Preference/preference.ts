import { User } from './../user/user.model';
import { ManyToOne, Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany, DataSource } from "typeorm"
import { TypeParameter } from '../parameter/models/parameter_type.model';
import { Preference } from './models/preference.model';


export const PreferenceProvider = [
    {
        provide: 'PREFERENCE_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Preference),
        inject: ['DATA_SOURCE']
    }
]