import { Parameter } from './models/parameter.model';
import { Repository } from 'typeorm';
import { CreateParameterDto } from './dto/parameter.dto';
export declare class ParameterService {
    private readonly parameterRepository;
    constructor(parameterRepository: Repository<Parameter>);
    findAll(): Promise<Record<string, Parameter[]>>;
    findAllBySlug(typeParmaSlug: string): Promise<Parameter[]>;
    findOneBySlug(slug: string): Promise<Parameter>;
    findByType(typeParametre: any): Promise<Parameter[]>;
    create(createParameterDto: CreateParameterDto): Promise<void>;
    update(id: number, updateParameterDto: CreateParameterDto): Promise<Parameter>;
    remove(id: number): Promise<Parameter>;
}
