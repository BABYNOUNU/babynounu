import { MediaService } from './../media/media.service';
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Parents } from './models/parent.model';
import { CreateParentDto } from './dto/create-parent.dto';
import { UpdateParentDto } from './dto/create-parent.dto';
import { Preference } from '../Preference/models/preference.model';
import { HOST } from 'src/database/database.providers';
import { NounusService } from '../nounus/nounus.service';

@Injectable()
export class ParentsService {
  constructor(
    @Inject('PARENT_REPOSITORY')
    private readonly parentsRepository: Repository<Parents>,

    @Inject('PREFERENCE_REPOSITORY')
    private readonly preferenceRepository: Repository<Preference>,

    private readonly mediaService: MediaService,
    private readonly nounuService: NounusService,
  ) {}

  async findAll(): Promise<Parents[]> {
    return await this.parentsRepository.find({ relations: ['preferences'] });
  }

  async findOne(id: string): Promise<any> {
    const parent = await this.parentsRepository.findOne({
      where: { id },
      relations: [
        'user',
        'user.medias',
        'user.medias.type_media',
        'preferences',
        'preferences.besions_specifiques',
        'preferences.garde_enfants',
        'preferences.aide_menagere',
        'preferences.frequence_des_services',
        'preferences.horaire_souhaites',
        'preferences.adress',
        'preferences.zone_geographique_prestataire',
        'preferences.competance_specifique',
        'preferences.langue_parler',
        'preferences.disponibility_du_prestataire',
      ],
    });
    if (!parent) {
      throw new NotFoundException(`Parent with id ${id} not found`);
    }
    const ParentGet = await this.nounuService.ReturnN(
      [parent],
      [
        'besions_specifiques',
        'garde_enfants',
        'aide_menagere',
        'frequence_des_services',
        'horaire_souhaites',
        'adress',
        'zone_geographique_prestataire',
        'competance_specifique',
        'langue_parler',
        'disponibility_du_prestataire',
      ],
    );

    return ParentGet[0]
  }

  async create(
    createParentDto: CreateParentDto,
    files: { imageParent: Express.Multer.File[] },
  ): Promise<Parents> {
    const { userId, ...parentData } = createParentDto;

    // Create and save the parent
    const savedParent = await this.parentsRepository.save({
      ...parentData,
      user: { id: userId },
    });

    if (!savedParent) {
      throw new BadRequestException('Parent not created');
    }

    // Upload image if provided
    if (files.imageParent?.length > 0) {
      const imageParent = files.imageParent[0];
      await this.mediaService.create({
        originalName: imageParent.originalname,
        filename: imageParent.filename,
        path: imageParent.path,
        originalUrl: `${HOST}/uploads/${imageParent.filename}`,
        userId: userId,
        typeMedia: 'image-profil',
      });
    }

    // Save preferences
    const preferenceKeys = [
      'besions_specifiques',
      'garde_enfants',
      'aide_menagere',
      'frequence_des_services',
      'horaire_souhaites',
      'adress',
      'zone_geographique_prestataire',
      'competance_specifique',
      'langue_parler',
      'disponibility_du_prestataire',
    ];

    for (const key of preferenceKeys) {
      const value = JSON.parse(createParentDto[key]);
      if (Array.isArray(value)) {
        const preferenceEntities = value.map((el) => ({
          parents: savedParent,
          [key]: el.id,
        }));
        await this.preferenceRepository.save(preferenceEntities);
      }
    }

    return savedParent;
  }
  async update(id: string, updateParentDto: UpdateParentDto): Promise<Parents> {
    const { ...parentData } = updateParentDto;

    const parent = await this.findOne(id);

    const updatedParent = Object.assign(parent, { ...parentData });
    return await this.parentsRepository.save(updatedParent);
  }

  async remove(id: string): Promise<void> {
    const result = await this.parentsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Parent with id ${id} not found`);
    }
  }
}
