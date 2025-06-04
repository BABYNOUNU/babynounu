import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('app_settings')
export class UpdateApp {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    appName: string;

    @Column({ nullable: true })
    version: string;

    @Column({ nullable: true })
    description: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    lastUpdate: Date;

    @Column({ default: true })
    isActive: boolean;

    @Column({ type: 'json', nullable: true })
    settings: Record<string, any>;
}
