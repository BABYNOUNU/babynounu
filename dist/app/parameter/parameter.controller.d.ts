import { ParameterService } from './parameter.service';
import { CreateParameterDto } from './dto/parameter.dto';
import { Response } from 'express';
export declare class ParameterController {
    private readonly parameterService;
    constructor(parameterService: ParameterService);
    index(res: Response): Promise<Response<any, Record<string, any>>>;
    indexQuery(typeParametre: string, res: Response): Promise<Response<any, Record<string, any>>>;
    findAllBySlug(typeParmaSlug: string, res: Response): Promise<Response<any, Record<string, any>>>;
    findOneBySlug(typeParmaSlug: string, res: Response): Promise<Response<any, Record<string, any>>>;
    create(createParameterDto: CreateParameterDto, res: Response): Promise<Response<any, Record<string, any>>>;
    update(id: number, updateParameterDto: CreateParameterDto, res: Response): Promise<Response<any, Record<string, any>>>;
    delete(id: number, res: Response): Promise<Response<any, Record<string, any>>>;
}
