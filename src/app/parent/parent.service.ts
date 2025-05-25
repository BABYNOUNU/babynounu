import { MediaService } from './../media/media.service';
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Not, Repository } from 'typeorm';
import { ProfilParents } from './models/parent.model';
import { CreateParentDto } from './dto/create-parent.dto';
import { UpdateParentDto } from './dto/update-parent.dto';
import { Preference } from '../Preference/models/preference.model';
import { HOST } from 'src/database/database.providers';
import { NounusService } from '../nounus/nounus.service';

@Injectable()
export class ParentsService {
  constructor(
    @Inject('PARENT_REPOSITORY')
    private readonly parentsRepository: Repository<ProfilParents>,

    @Inject('PREFERENCE_REPOSITORY')
    private readonly preferenceRepository: Repository<Preference>,

    private readonly mediaService: MediaService,
    private readonly nounuService: NounusService,
  ) {}

  async findAll(userId: any, page: number = 1, limit: number = 10): Promise<any> {
    // Convertir les paramètres de pagination en nombres
    page = parseInt(page.toString(), 10) || 1;
    limit = parseInt(limit.toString(), 10) || 10;
    const skip = (page - 1) * limit;
    
    // Récupérer les parents avec pagination
    const [parents, total] = await this.parentsRepository.findAndCount({
      relations: [
        'user',
        'user.medias',
        'user.medias.type_media',
        'preferences',
        'preferences.garde_enfants',
        'preferences.horaire_souhaites',
        'preferences.adress',
      ],
      where: {
        user: {
          id: Not(userId), // Exclure l'utilisateur connecté
        },
      },
      skip: skip,
      take: limit,
      order: {
        createdAt: 'DESC', // Trier par date de création (du plus récent au plus ancien)
      },
    });
    
    if (!parents) {
      throw new NotFoundException(`Parent with not found`);
    }
    
    const formattedParents = await this.nounuService.ReturnN(parents, [
      'frequence_des_services',
      'horaire_souhaites',
      'adress',
    ]);

    // Retourner les données avec les métadonnées de pagination
    return {
      data: formattedParents,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page < Math.ceil(total / limit),
        hasPrevPage: page > 1
      }
    };
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
  ): Promise<ProfilParents> {
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
  ): Promise<ProfilParents> {
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
            parents: { id },
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

  async search(
    searchCriteria: any,
    page = 1,
    limit = 10,
  ): Promise<{ data: any[]; pagination: any }> {
    const {
      besions_specifiques,
      garde_enfants,
      aide_menagere,
      frequence_des_services,
      horaire_souhaites,
      zone_geographique_prestataire,
      disponibility_du_prestataire,
      fullname,
    } = searchCriteria;

    // Convertir page et limit en nombres
    const pageNum = parseInt(page.toString(), 10) || 1;
    const limitNum = parseInt(limit.toString(), 10) || 10;

    // Récupérer tous les parents avec les relations nécessaires
    const _parents = await this.parentsRepository.find({
      relations: [
        'user',
        'user.medias',
        'user.medias.type_media',
        'preferences',
        'preferences.garde_enfants',
        'preferences.horaire_souhaites',
        'preferences.adress',
      ],
    });

    const parents = await this.nounuService.ReturnN(_parents, [
      'frequence_des_services',
      'horaire_souhaites',
      'adress',
    ]);

    // Filtrer les parents en fonction des critères de recherche
    const filteredParents = parents.filter((parent: any) => {
      // Filtrer par fullname
      if (fullname) {
        const hasMatchingFullname = parent.fullname
          .toLowerCase()
          .includes(fullname.toLowerCase());
        if (!hasMatchingFullname) return false;
      }

      // Filtrer par besoins spécifiques
      if (besions_specifiques && besions_specifiques.length > 0) {
        const hasMatchingBesoin = parent.preferences.besions_specifiques.some(
          (besoin: any) => besions_specifiques.includes(besoin.id),
        );
        if (!hasMatchingBesoin) return false;
      }

      // Filtrer par garde d'enfants
      if (garde_enfants && garde_enfants.length > 0) {
        const hasMatchingGarde = parent.preferences.garde_enfants.some(
          (garde: any) => garde_enfants.includes(garde.id),
        );
        if (!hasMatchingGarde) return false;
      }

      // Filtrer par aide ménagère
      if (aide_menagere && aide_menagere.length > 0) {
        const hasMatchingAide = parent.preferences.aide_menagere.some(
          (aide: any) => aide_menagere.includes(aide.id),
        );
        if (!hasMatchingAide) return false;
      }

      // Filtrer par fréquence des services
      if (frequence_des_services && frequence_des_services.length > 0) {
        const hasMatchingFrequence =
          parent.preferences.frequence_des_services.some((frequence: any) =>
            frequence_des_services.includes(frequence.id),
          );
        if (!hasMatchingFrequence) return false;
      }

      // Filtrer par horaires souhaités
      if (horaire_souhaites && horaire_souhaites.length > 0) {
        const hasMatchingHoraire = parent.preferences.horaire_souhaites.some(
          (horaire: any) => horaire_souhaites.includes(horaire.id),
        );
        if (!hasMatchingHoraire) return false;
      }

      // Filtrer par zone géographique du prestataire
      if (
        zone_geographique_prestataire &&
        zone_geographique_prestataire.length > 0
      ) {
        const hasMatchingZone =
          parent.preferences.zone_geographique_prestataire.some((zone: any) =>
            zone_geographique_prestataire.includes(zone.id),
          );
        if (!hasMatchingZone) return false;
      }

      // Filtrer par disponibilité du prestataire
      if (
        disponibility_du_prestataire &&
        disponibility_du_prestataire.length > 0
      ) {
        const hasMatchingDisponibility =
          parent.preferences.disponibility_du_prestataire.some(
            (disponibility: any) =>
              disponibility_du_prestataire.includes(disponibility.id),
          );
        if (!hasMatchingDisponibility) return false;
      }

      // Si tous les critères sont satisfaits, inclure le parent dans les résultats
      return true;
    });

    // Calculer le nombre total d'éléments pour la pagination
    const total = filteredParents.length;

    // Appliquer la pagination
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = pageNum * limitNum;
    const paginatedData = filteredParents.slice(startIndex, endIndex);

    // Retourner les données avec les métadonnées de pagination
    return {
      data: paginatedData,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
        hasNextPage: pageNum < Math.ceil(total / limitNum),
        hasPrevPage: pageNum > 1,
      },
    };
  }
}
