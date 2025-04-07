import { Repository } from 'typeorm';
import { Contracts } from './models/contracts.model';
import { CreateContractDto } from './dtos/create-contracts.dto';
import { UpdateContractDto } from './dtos/update-contracts.dto';
import { Nounus } from '../nounus/models/nounu.model';
import { Parents } from '../parent/models/parent.model';
import { NotificationService } from '../notification/notification.service';
export declare class ContractsService {
    private readonly contractsRepository;
    private readonly nounusRepository;
    private readonly parentsRepository;
    private readonly notificationService;
    constructor(contractsRepository: Repository<Contracts>, nounusRepository: Repository<Nounus>, parentsRepository: Repository<Parents>, notificationService: NotificationService);
    create(createContractDto: CreateContractDto): Promise<Contracts>;
    findAll(): Promise<Contracts[]>;
    findOne(id: number): Promise<Contracts>;
    update(id: number, updateContractDto: UpdateContractDto): Promise<Contracts>;
    remove(id: number): Promise<void>;
    restore(id: number): Promise<Contracts>;
}
