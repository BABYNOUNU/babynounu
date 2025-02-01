import { ManyToOne, Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany } from "typeorm"
import { Parameter } from "src/app/parameter/models/parameter.model"
import { User } from "src/app/user/user.model"
import { TypeParameter } from "src/app/parameter/models/parameter_type.model"


@Entity("user_preferences")
export class Preference {

    @PrimaryGeneratedColumn()
    id: Number

    @ManyToOne(() => Parameter, (type) => type.preference, {onDelete: 'CASCADE',})
    parameter: Parameter[]

    @ManyToOne(() => TypeParameter, (type) => type.parameter, {onDelete: 'CASCADE',})
    parent: TypeParameter

    @ManyToOne(() => User, (type) => type.preference, {onDelete: 'CASCADE',})
    user: User

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @DeleteDateColumn()
    deleted_at: Date
}