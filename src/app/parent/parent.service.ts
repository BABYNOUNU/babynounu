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
import { UpdateParentDto } from './dto/update-parent.dto';
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
        'preferences.mode_de_paiement',
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
        'mode_de_paiement',
      ],
    );

    return ParentGet[0];
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
      'mode_de_paiement',
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
  async update(
    id: string, // L'ID du parent à mettre à jour
    updateParentDto: UpdateParentDto,
    files: { imageParent: Express.Multer.File[] },
  ): Promise<Parents> {
    try {
      const { userId, ...parentData } = updateParentDto;

      // Récupérer le parent existant
      const existingParent = await this.parentsRepository.findOne({
        where: { id },
        relations: ['user'],
      });

      if (!existingParent) {
        throw new NotFoundException('Parent not found');
      }

      // Mettre à jour les données du parent
      const updatedParent = await this.parentsRepository.save({
        ...existingParent,
        ...parentData,
        user: { id: userId },
      });

      if (!updatedParent) {
        throw new BadRequestException('Parent not updated');
      }

      // Mettre à jour l'image si fournie
      if (files.imageParent?.length > 0) {
        const imageParent = files.imageParent[0];
        await this.mediaService.update(
          { id: existingParent.user.id, typeMedia: 'image-profil' }, // Critères de recherche pour trouver l'image existante
          {
            originalName: imageParent.originalname,
            filename: imageParent.filename,
            path: imageParent.path,
            originalUrl: `${HOST}/uploads/${imageParent.filename}`,
          },
        );
      }

      // Mettre à jour les préférences
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
        'mode_de_paiement',
      ];

      for (const key of preferenceKeys) {
        const value = JSON.parse(updateParentDto[key]);
        if (Array.isArray(value)) {
          // Supprimer les anciennes préférences
          await this.preferenceRepository.delete({
            parents: { id }
          });
        }
      }

      for (const key of preferenceKeys) {
        const value = JSON.parse(updateParentDto[key]);
        if (Array.isArray(value)) {

          // Ajouter les nouvelles préférences
          const preferenceEntities = value.map((el) => ({
            parents: updatedParent,
            [key]: el.id,
          }));
          await this.preferenceRepository.save(preferenceEntities);
        }
      }

      return await this.findOne(id);
    } catch (error) {
      console.log(error);
    }
  }

  async remove(id: string): Promise<void> {
    const result = await this.parentsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Parent with id ${id} not found`);
    }
  }

  async search(searchCriteria: any): Promise<any[]> {
    const {
      besions_specifiques,
      garde_enfants,
      aide_menagere,
      frequence_des_services,
      horaire_souhaites,
      zone_geographique_prestataire,
      disponibility_du_prestataire,
    } = searchCriteria;

    // Créer une requête de base pour les Parents
    const parentQuery = this.parentsRepository
      .createQueryBuilder('parent')
      .leftJoinAndSelect('parent.preferences', 'preferences')
      .leftJoinAndSelect('parent.user', 'user');

    // Appliquer les filtres pour les Parents
    if (besions_specifiques) {
      parentQuery.andWhere(
        'preferences.besions_specifiques = :besions_specifiques',
        { besions_specifiques },
      );
    }
    if (garde_enfants) {
      parentQuery.andWhere('preferences.garde_enfants = :garde_enfants', {
        garde_enfants,
      });
    }
    if (aide_menagere) {
      parentQuery.andWhere('preferences.aide_menagere = :aide_menagere', {
        aide_menagere,
      });
    }
    if (frequence_des_services) {
      parentQuery.andWhere(
        'preferences.frequence_des_services = :frequence_des_services',
        { frequence_des_services },
      );
    }
    if (horaire_souhaites) {
      parentQuery.andWhere(
        'preferences.horaire_souhaites = :horaire_souhaites',
        { horaire_souhaites },
      );
    }
    if (zone_geographique_prestataire) {
      parentQuery.andWhere(
        'preferences.zone_geographique_prestataire = :zone_geographique_prestataire',
        { zone_geographique_prestataire },
      );
    }
    if (disponibility_du_prestataire) {
      parentQuery.andWhere(
        'preferences.disponibility_du_prestataire = :disponibility_du_prestataire',
        { disponibility_du_prestataire },
      );
    }

    // Exécuter la requête
    const parents = await parentQuery.getMany();

    return parents;
  }
}
