import { Nounus } from 'src/app/nounus/models/nounu.model';
import { Parents } from 'src/app/parent/models/parent.model';
export declare class Contracts {
    id: number;
    price: number;
    duration: number;
    nounu: Nounus;
    parent: Parents;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
