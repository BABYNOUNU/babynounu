import { Parameter } from "./parameter.model";
import { Preference } from 'src/app/Preference/models/preference.model';
import { Profile } from "src/app/profiles/models/profile.model";
import { OneToMany, Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm"


@Entity("parameter_types")
export class TypeParameter {

    @PrimaryGeneratedColumn()
    id: Number

    @Column({nullable: true})
    slug: string

    @Column()
    name: string

    @OneToMany(() => Parameter, (parameter) => parameter.type_parameter, {cascade: true})
    parameter: Parameter

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @DeleteDateColumn()
    deleted_at: Date
}