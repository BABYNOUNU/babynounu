import { NounusService } from './../nounus/nounus.service';
import { Repository } from 'typeorm';
import { Contracts } from './models/contracts.model';
import { CreateContractDto } from './dtos/create-contracts.dto';
import { UpdateContractDto } from './dtos/update-contracts.dto';
import { ProfilNounus } from '../nounus/models/nounu.model';
import { ProfilParents } from '../parent/models/parent.model';
import { NotificationService } from '../notification/notification.service';
export declare class ContractsService {
    private readonly contractsRepository;
    private readonly nounusRepository;
    private readonly parentsRepository;
    private readonly notificationService;
    private readonly nounusService;
    constructor(contractsRepository: Repository<Contracts>, nounusRepository: Repository<ProfilNounus>, parentsRepository: Repository<ProfilParents>, notificationService: NotificationService, nounusService: NounusService);
    create(createContractDto: CreateContractDto): Promise<Contracts>;
    findAll(): Promise<Contracts[]>;
    findAllByUserId(userId: string): Promise<Contracts[]>;
    findOne(id: number): Promise<any>;
    update(id: number, updateContractDto: UpdateContractDto): Promise<Contracts>;
    updateStatus(id: number, status: 'Accepted' | 'Pending' | 'Canceled'): Promise<Contracts>;
    remove(id: number): Promise<void>;
    restore(id: number): Promise<Contracts>;
}
