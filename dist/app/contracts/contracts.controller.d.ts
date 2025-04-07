import { ContractsService } from './contracts.service';
import { CreateContractDto } from './dtos/create-contracts.dto';
import { UpdateContractDto } from './dtos/update-contracts.dto';
import { Contracts } from './models/contracts.model';
export declare class ContractsController {
    private readonly contractsService;
    constructor(contractsService: ContractsService);
    create(createContractDto: CreateContractDto): Promise<Contracts>;
    findAll(): Promise<Contracts[]>;
    findOne(id: number): Promise<Contracts>;
    update(id: number, updateContractDto: UpdateContractDto): Promise<Contracts>;
    remove(id: number): Promise<void>;
    restore(id: number): Promise<Contracts>;
}
