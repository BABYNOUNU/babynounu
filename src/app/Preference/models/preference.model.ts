import { ManyToOne, Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany } from "typeorm"
import { Parameter } from "src/app/parameter/models/parameter.model"
import { User } from "src/app/user/user.model"
import { TypeParameter } from "src/app/parameter/models/parameter_type.model"
import { Profile } from "src/app/profiles/models/profile.model"


@Entity("user_preferences")
export class Preference {

    @PrimaryGeneratedColumn()
    id: Number

    @ManyToOne(() => Parameter, (type) => type.preference, {onDelete: 'CASCADE',})
    localization: Parameter[]

    @ManyToOne(() => User, (type) => type.preference, {onDelete: 'CASCADE',})
    user: User

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @DeleteDateColumn()
    deleted_at: Date
}