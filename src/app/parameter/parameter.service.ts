import { Parameter } from './models/parameter.model';
import { Injectable, NotFoundException , Inject } from '@nestjs/common';

import { Repository } from 'typeorm';
import { CreateParameterDto } from './dto/parameter.dto';

@Injectable()
export class ParameterService {
  constructor(
    @Inject('PARAMETER_REPOSITORY')
    private readonly parameterRepository: Repository<Parameter>,
  ) {}

  // Récupère tous les paramètres
  async findAll() {
    return this.parameterRepository.find({
      relations: { type_parameter: true,  },
    });
  }

  async findAllBySlug(typeParmaSlug: string) {
    return this.parameterRepository.find({ where: { type_parameter: {slug: typeParmaSlug}  },
      relations: { type_parameter: true  },
    });
  }

  
  // Récupère un paramètre par son slug
  async findOneBySlug(slug: string) {
    const parameter = await this.parameterRepository.findOne({ where: { slug }, relations: ['type_parameter'] });
    if (!parameter) {
      throw new NotFoundException(`Parameter with slug ${slug} not found`);
    }
    return parameter;
  }

  // Récupère les paramètres en fonction du type
  async findByType(typeParametre: any) {
    return this.parameterRepository.find({
      where: { type_parameter: typeParametre },
      relations: { type_parameter: true },
    });
  }
  

  // Créer un nouveau paramètre
  async create(createParameterDto: CreateParameterDto) {
    // const newParameter = this.parameterRepository.create({
    //   type_parameter: createParameterDto.type_parameter,
    //   user: createParameterDto.user,
    //   preference: createParameterDto.preference
    // });
    // return this.parameterRepository.save(newParameter);
  }

  // Mettre à jour un paramètre
  async update(id: number, updateParameterDto: CreateParameterDto) {
    const parameter = await this.parameterRepository.findOne({ where: { id } });
    if (!parameter) {
      throw new NotFoundException('Paramètre non trouvé');
    }

    // Mettez à jour les champs du paramètre
    Object.assign(parameter, updateParameterDto);
    return this.parameterRepository.save(parameter);
  }

  // Supprimer un paramètre
  async remove(id: number) {
    const parameter = await this.parameterRepository.findOne({ where: { id } });
    if (!parameter) {
      throw new NotFoundException('Paramètre non trouvé');
    }

    return this.parameterRepository.remove(parameter);
  }
}
