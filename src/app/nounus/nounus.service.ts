import { NotificationService } from './../notification/notification.service';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, In, Like, Not, Repository } from 'typeorm';
import { ProfilNounus } from './models/nounu.model';
import { CreateNounuDto } from './dto/create-nounu.dto';
import { UpdateNounuDto } from './dto/update-nounu.dto';
import { MediaService } from '../media/media.service';
import { HOST } from 'src/database/database.providers';
import { Preference } from '../Preference/models/preference.model';

@Injectable()
export class NounusService {
  constructor(
    @InjectRepository(ProfilNounus)
    private readonly nounuRepository: Repository<ProfilNounus>,
    @InjectRepository(Preference)
    private readonly preferenceRepository: Repository<Preference>,
    private readonly notificationService: NotificationService,
    private readonly mediaService: MediaService,
  ) {}

  async create(
    createNounuDto: CreateNounuDto,
    files: {
      imageNounu: Express.Multer.File[];
      documents: Express.Multer.File[];
      gallery: Express.Multer.File[];
    },
  ): Promise<ProfilNounus> {
    const { userId, ...nounuData } = createNounuDto;
    
    // Pré-parser toutes les préférences en une seule fois
    const parsedPreferences = {};
    const preferenceKeys = [
      'zone_de_travail',
      'horaire_disponible',
      'adress',
      'tranche_age_enfants',
      'competance_specifique',
      'langue_parler',
      'certifications_criteres',
    ];
    
    for (const key of preferenceKeys) {
      parsedPreferences[key] = JSON.parse(createNounuDto[key]);
    }
    
    // Utiliser une transaction pour toutes les opérations de base de données
    const queryRunner = this.nounuRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    
    try {
      // Créer et sauvegarder le nounu
      const savedNounu = await queryRunner.manager.save(ProfilNounus, {
        ...nounuData,
        urgences: nounuData.urgences === 'true' ? true : false,
        flexibilite_tarifaire:
          nounuData.flexibilite_tarifaire === 'true' ? true : false,
        user: { id: userId },
      });
      
      // Préparer les médias à créer
      const mediaToCreate = [];
      
      // Ajouter l'image principale si fournie
      if (files.imageNounu?.length > 0) {
        const imageNounu = files.imageNounu[0];
        mediaToCreate.push({
          originalName: imageNounu.originalname,
          filename: imageNounu.filename,
          path: imageNounu.path,
          originalUrl: `${HOST}/uploads/${imageNounu.filename}`,
          userId: userId,
          typeMedia: 'image-profil',
        });
        
        // Ajouter les documents
        if (files.documents?.length > 0) {
          for (const document of files.documents) {
            mediaToCreate.push({
              originalName: document.originalname,
              filename: document.filename,
              path: document.path,
              originalUrl: `${HOST}/uploads/${document.filename}`,
              userId: userId,
              typeMedia: 'document-verification',
            });
          }
        }
        
        // Ajouter les images de galerie
        if (files.gallery?.length > 0) {
          for (const gallery of files.gallery) {
            mediaToCreate.push({
              originalName: gallery.originalname,
              filename: gallery.filename,
              path: gallery.path,
              originalUrl: `${HOST}/uploads/${gallery.filename}`,
              userId: userId,
              typeMedia: 'gallery-image',
            });
          }
        }
      }
      
      // Créer tous les médias en une seule opération si possible
      if (mediaToCreate.length > 0) {
        await Promise.all(mediaToCreate.map(media => 
          this.mediaService.create(media)
        ));
      }
      
      // Préparer toutes les préférences à sauvegarder
      const preferencesToSave = [];
      for (const key of preferenceKeys) {
        const value = parsedPreferences[key];
        if (Array.isArray(value)) {
          value.forEach(el => {
            preferencesToSave.push({
              nounus: savedNounu,
              [key]: el.id,
            });
          });
        }
      }
      
      // Sauvegarder toutes les préférences en une seule opération
      if (preferencesToSave.length > 0) {
        await queryRunner.manager.save(Preference, preferencesToSave);
      }
      
      await queryRunner.commitTransaction();
      return savedNounu;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException('Erreur lors de la création du profil: ' + error.message);
    } finally {
      await queryRunner.release();
    }
  }

  async findAllNotCurrentUser(
    userId: any, 
    page: number = 1, 
    limit: number = 10
  ): Promise<any> {
    // Calculer l'offset pour la pagination
    page = parseInt(page.toString(), 10) || 1;
    limit = parseInt(limit.toString(), 10) || 10;
    const skip = (page - 1) * limit;
    
    // Récupérer tous les nounous sauf celui connecté avec pagination
    const [nounus, total] = await this.nounuRepository.findAndCount({
      relations: [
        'user',
        'user.medias',
        'user.medias.type_media',
        'preferences',
        'preferences.horaire_disponible',
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

    const formattedNounus = await this.ReturnN(nounus, [
      'horaire_disponible',
      'adress'
    ]);

    // Retourner les données avec les métadonnées de pagination
    return {
      data: formattedNounus,
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

  async findAll(): Promise<any> {
    // Récupérer tous les nounous sauf celui connecté
    const nounus = await this.nounuRepository.find({
      relations: [
        'user',
        'user.medias',
        'user.medias.type_media',
        'preferences',
        'preferences.horaire_disponible',
        'preferences.adress',
      ],
    });

    return await this.ReturnN(nounus, [
      'horaire_disponible',
      'adress',
    ]);
  }

  async findOne(id: string): Promise<any> {
    const nounu = await this.nounuRepository.findOne({
      where: { id },
      relations: [
        'user',
        'user.medias',
        'preferences',
        'preferences.zone_de_travail',
        'preferences.horaire_disponible',
        'preferences.adress',
        'preferences.tranche_age_enfants',
        'preferences.competance_specifique',
        'preferences.certifications_criteres',
        'preferences.langue_parler',
        'user.medias.type_media',
      ],
    });
    if (!nounu) {
      throw new NotFoundException(`ProfilNounus with ID ${id} not found`);
    }

    const nounuOne = await this.ReturnN(
      [nounu],
      [
        'zone_de_travail',
        'horaire_disponible',
        'adress',
        'tranche_age_enfants',
        'competance_specifique',
        'langue_parler',
        'certifications_criteres',
      ],
    );

    return nounuOne[0];
  }

  async update(
    id: string, // L'ID du Nounu à mettre à jour
    updateNounuDto: UpdateNounuDto,
    files: {
      imageNounu: Express.Multer.File[];
      documents: Express.Multer.File[];
      gallery: Express.Multer.File[];
    },
  ): Promise<ProfilNounus> {
    const { userId, ...nounuData } = updateNounuDto;

    // Utiliser une transaction pour toutes les opérations
    const queryRunner = this.nounuRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Récupérer le Nounu existant
      const existingNounu = await queryRunner.manager.findOne(ProfilNounus, {
        where: { id: id },
        relations: ['user'],
      });

      if (!existingNounu) {
        throw new NotFoundException('Nounu not found');
      }

      // Mettre à jour les données du Nounu
      const updatedNounu = await queryRunner.manager.save(ProfilNounus, {
        ...existingNounu,
        ...nounuData,
        urgences: nounuData.urgences === 'true' ? true : false,
        flexibilite_tarifaire:
          nounuData.flexibilite_tarifaire === 'true' ? true : false,
        user: { id: userId },
      });

      // Préparer les médias à créer/mettre à jour
      const mediaPromises = [];

      // Mettre à jour l'image de profil si fournie
      if (files.imageNounu?.length > 0) {
        const imageNounu = files.imageNounu[0];
        mediaPromises.push(
          this.mediaService.update(
            { id: existingNounu.user.id, typeMedia: 'image-profil' },
            {
              originalName: imageNounu.originalname,
              filename: imageNounu.filename,
              path: imageNounu.path,
              originalUrl: `${HOST}/uploads/${imageNounu.filename}`,
            },
          )
        );
      }

      // Préparer les documents à créer
      if (files.documents?.length > 0) {
        const documentsToCreate = files.documents.map(document => ({
          originalName: document.originalname,
          filename: document.filename,
          path: document.path,
          originalUrl: `${HOST}/uploads/${document.filename}`,
          userId: userId,
          typeMedia: 'document-verification',
        }));
        
        mediaPromises.push(
          Promise.all(documentsToCreate.map(doc => this.mediaService.create(doc)))
        );
      }

      // Préparer les images de galerie à créer
      if (files.gallery?.length > 0) {
        const galleryToCreate = files.gallery.map(gallery => ({
          originalName: gallery.originalname,
          filename: gallery.filename,
          path: gallery.path,
          originalUrl: `${HOST}/uploads/${gallery.filename}`,
          userId: userId,
          typeMedia: 'gallery-image',
        }));
        
        mediaPromises.push(
          Promise.all(galleryToCreate.map(img => this.mediaService.create(img)))
        );
      }

      // Exécuter toutes les opérations de média en parallèle
      if (mediaPromises.length > 0) {
        await Promise.all(mediaPromises);
      }

      // Pré-parser toutes les préférences en une seule fois
      const preferenceKeys = [
        'zone_de_travail',
        'horaire_disponible',
        'adress',
        'tranche_age_enfants',
        'competance_specifique',
        'langue_parler',
        'certifications_criteres',
      ];
      
      const parsedPreferences = {};
      let hasPreferences = false;
      
      for (const key of preferenceKeys) {
        if (updateNounuDto[key]) {
          parsedPreferences[key] = JSON.parse(updateNounuDto[key]);
          if (Array.isArray(parsedPreferences[key]) && parsedPreferences[key].length > 0) {
            hasPreferences = true;
          }
        }
      }

      // Mettre à jour les préférences seulement si nécessaire
      if (hasPreferences) {
        // Supprimer toutes les anciennes préférences en une seule opération
        await queryRunner.manager.delete(Preference, { nounus: { id: updatedNounu.id } });
        
        // Préparer toutes les nouvelles préférences
        const allPreferences = [];
        
        for (const key of preferenceKeys) {
          if (parsedPreferences[key] && Array.isArray(parsedPreferences[key])) {
            const prefsForKey = parsedPreferences[key].map(el => ({
              nounus: updatedNounu,
              [key]: el.id,
            }));
            allPreferences.push(...prefsForKey);
          }
        }
        
        // Sauvegarder toutes les préférences en une seule opération
        if (allPreferences.length > 0) {
          await queryRunner.manager.save(Preference, allPreferences);
        }
      }

      await queryRunner.commitTransaction();
      return updatedNounu;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException('Erreur lors de la mise à jour du profil: ' + error.message);
    } finally {
      await queryRunner.release();
    }
  }

  async updatePoints(id: string, points: number): Promise<ProfilNounus> {
    const nounu = await this.findOne(id);
    if (!nounu) {
      throw new NotFoundException(`ProfilNounus with ID ${id} not found`);
    }
    this.nounuRepository.increment({ id }, 'points', points);
    return nounu;
  }

async decrementPoints(id: string, points: number): Promise<ProfilNounus> {
  const nounu = await this.findOne(id);
  if (!nounu) {
    throw new NotFoundException(`ProfilNounus with ID ${id} not found`);
  }

  // Check if nounu has enough points
  if (nounu.points < points) {
    throw new BadRequestException('Not enough points to decrement');
  }

  // Decrement points
  await this.nounuRepository.decrement({ id }, 'points', points);
  
  // Return updated nounu
  return await this.findOne(id);
}

  async remove(id: string): Promise<void> {
    const nounu = await this.findOne(id);
    await this.nounuRepository.remove(nounu);
  }

  async search(
    searchCriteria: any,
    page: number = 1,
    limit: number = 30
  ): Promise<{ data: any[], pagination: any }> {

    page = parseInt(page.toString(), 10) || 1;
    limit = parseInt(limit.toString(), 10) || 30;



    const {
      fullname,
      description,
      zone_de_travail,
      horaire_disponible,
      adress,
      tranche_age_enfants,
      competance_specifique,
      langue_parler,
    } = searchCriteria;

    // Construire une requête optimisée avec QueryBuilder
    let queryBuilder = this.nounuRepository.createQueryBuilder('nounu')
      .leftJoinAndSelect('nounu.user', 'user')
      .leftJoinAndSelect('user.medias', 'medias')
      .leftJoinAndSelect('medias.type_media', 'type_media')
      .leftJoinAndSelect('nounu.preferences', 'preferences')
      .leftJoinAndSelect('preferences.zone_de_travail', 'zone_de_travail')
      .leftJoinAndSelect('preferences.horaire_disponible', 'horaire_disponible')
      .leftJoinAndSelect('preferences.adress', 'adress')
      .leftJoinAndSelect('preferences.tranche_age_enfants', 'tranche_age_enfants')
      .leftJoinAndSelect('preferences.competance_specifique', 'competance_specifique')
      .leftJoinAndSelect('preferences.langue_parler', 'langue_parler')
      .leftJoinAndSelect('preferences.certifications_criteres', 'certifications_criteres');

    // Appliquer les filtres de base directement dans la requête SQL
    if (fullname) {
      queryBuilder = queryBuilder.andWhere('LOWER(nounu.fullname) LIKE LOWER(:fullname)', { 
        fullname: `%${fullname}%` 
      });
    }

    if (description) {
      queryBuilder = queryBuilder.andWhere('LOWER(nounu.description) LIKE LOWER(:description)', { 
        description: `%${description}%` 
      });
    }

    // Obtenir le nombre total avant pagination pour les métadonnées
    const total = await queryBuilder.getCount();

    // Appliquer la pagination
    queryBuilder = queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy('nounu.createdAt', 'DESC');

    // Exécuter la requête
    const _nounus = await queryBuilder.getMany();

    // Transformer les résultats avec ReturnN
    const nounus = await this.ReturnN(_nounus, [
      'zone_de_travail',
      'horaire_disponible',
      'adress',
      'tranche_age_enfants',
      'competance_specifique',
      'langue_parler',
      'certifications_criteres',
    ]);

    // Filtrer les résultats pour les critères complexes qui ne peuvent pas être
    // facilement exprimés en SQL
    const filteredNounus = nounus.filter((nounu: any) => {
      // Filtrer par zone de travail
      if (zone_de_travail && zone_de_travail.length > 0) {
        const hasMatchingZone = nounu.preferences.zone_de_travail.some(
          (zone: any) => zone_de_travail.includes(zone.id),
        );
        if (!hasMatchingZone) return false;
      }

      // Filtrer par horaire disponible
      if (horaire_disponible && horaire_disponible.length > 0) {
        const hasMatchingHoraire = nounu.preferences.horaire_disponible.some(
          (horaire: any) => horaire_disponible.includes(horaire.id),
        );
        if (!hasMatchingHoraire) return false;
      }

      // Filtrer par adresse
      if (adress && adress.length > 0) {
        const hasMatchingAdress = nounu.preferences.adress.some((addr: any) =>
          adress.includes(addr.id),
        );
        if (!hasMatchingAdress) return false;
      }

      // Filtrer par tranche d'âge des enfants
      if (tranche_age_enfants && tranche_age_enfants.length > 0) {
        const hasMatchingAge = nounu.preferences.tranche_age_enfants.some(
          (age: any) => tranche_age_enfants.includes(age.id),
        );
        if (!hasMatchingAge) return false;
      }

      // Filtrer par compétence spécifique
      if (competance_specifique && competance_specifique.length > 0) {
        const hasMatchingCompetence =
          nounu.preferences.competance_specifique.some((competence: any) =>
            competance_specifique.includes(competence.id),
          );
        if (!hasMatchingCompetence) return false;
      }

      // Filtrer par langue parlée
      if (langue_parler && langue_parler.length > 0) {
        const hasMatchingLangue = nounu.preferences.langue_parler.some(
          (langue: any) => langue_parler.includes(langue.id),
        );
        if (!hasMatchingLangue) return false;
      }

      // Si tous les critères sont satisfaits, inclure la nounou dans les résultats
      return true;
    });

    // Retourner les données avec les métadonnées de pagination
    return {
      data: filteredNounus,
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

  async getNonCertifiedNounus(): Promise<any[]> {
    // Retrieve all nounus with necessary relations
    const _nounus = await this.nounuRepository.find({
      where: { certif: 'Pending' },
      relations: [
        'user',
        'user.medias',
        'user.medias.type_media',
        'preferences',
      ],
    });

    // Map through nounus and separate medias into images and documents
    return _nounus.map((nounu) => {
      const images = nounu.user.medias.filter(
        (media) => media.type_media.slug === 'image-profil',
      );
      const documents = nounu.user.medias.filter(
        (media) => media.type_media.slug === 'document-verification',
      );

      return {
        ...nounu,
        images,
        documents,
      };
    });
  }

  async approveCertification(
    nounuId: string,
  ): Promise<{ certif: 'Approved' | 'Pending' | 'Rejected' }> {
    const nounu = await this.nounuRepository.findOne({
      where: { id: nounuId },
      relations: ['user'],
    });

    if (!nounu) {
      throw new NotFoundException(`Nounu with id ${nounuId} not found`);
    }

    nounu.certif = 'Approved';
    await this.nounuRepository.save(nounu);

    this.notificationService.createNotification({
      type: 'PROFIL_DETAIL',
      userId: nounu.user.id,
      message: `Félicitations! Votre profil a été approuvé avec succès. Vous pouvez maintenant commencer à recevoir des demandes de garde d'enfants.`,
      is_read: false,
      senderUserId: nounu.user.id,
      tolinkId: nounuId.toString(),
    });

    return {
      certif: nounu.certif,
    };
  }

  async rejectCertification(
    nounuId: string,
  ): Promise<{ certif: 'Approved' | 'Pending' | 'Rejected' }> {
    const nounu = await this.nounuRepository.findOne({
      where: { id: nounuId },
      relations: ['user'],
    });

    if (!nounu) {
      throw new NotFoundException(`Nounu with id ${nounuId} not found`);
    }

    nounu.certif = 'Rejected';
    await this.nounuRepository.save(nounu);

    this.notificationService.createNotification({
      type: 'PROFIL_DETAIL',
      userId: nounu.user.id,
      message: `Désolé, votre profil a été rejeté. Veuillez vérifier vos documents et les informations fournies avant de soumettre à nouveau votre profil.`,
      is_read: false,
      senderUserId: nounu.user.id,
      tolinkId: nounuId.toString(),
    });

    return {
      certif: nounu.certif,
    };
  }

  async pendingCertification(
    nounuId: string,
  ): Promise<{ certif: 'Approved' | 'Pending' | 'Rejected' }> {
    const nounu = await this.nounuRepository.findOne({
      where: { id: nounuId },
      relations: ['user'],
    });

    if (!nounu) {
      throw new NotFoundException(`Nounu with id ${nounuId} not found`);
    }

    nounu.certif = 'Pending';
    await this.nounuRepository.save(nounu);

    this.notificationService.createNotification({
      type: 'PROFIL_DETAIL',
      userId: nounu.user.id,
      message: `Documents Modifier : Votre profil est en cours d'examen. Nous vous notifierons une fois la vérification terminée.`,
      is_read: false,
      senderUserId: nounu.user.id,
      tolinkId: nounuId,
    });

    return {
      certif: nounu.certif,
    };
  }

  async updateStatus(
    nounuId: string,
    status: string,
  ): Promise<{ status: string }> {
    const nounu = await this.nounuRepository.findOne({
      where: { id: nounuId },
    });

    if (!nounu) {
      throw new NotFoundException(`Nounu with id ${nounuId} not found`);
    }

    if (nounu.points == 0) {
      throw new BadRequestException('Cannot change status when points are 0');
    }

    this.decrementPoints(nounuId, 50);

    nounu.status = status;
    await this.nounuRepository.save(nounu);

    return {
      status: nounu.status,
    };
  }

  async ReturnN(datas: any[], preferenceKey: any[]): Promise<any[]> {
    return datas.map((data) => {
      // Regrouper les libellés similaires dans des tableaux distincts
      const aggregatedPreferences = {};
      preferenceKey.forEach((key) => {
        aggregatedPreferences[key] = [];
      });

      data.preferences.forEach((pref) => {
        preferenceKey.forEach((key) => {
          if (pref[key]) aggregatedPreferences[key].push(pref[key]);
        });
      });

      return {
        ...data,
        image: data.user.medias.find(
          (media) => media.type_media.slug === 'image-profil',
        ),
        gallery: data.user.medias.filter(
          (media) => media.type_media.slug === 'gallery-image',
        ),
        imageDocuments: data.user.medias.filter(
          (media) => media.type_media.slug === 'document-verification',
        ),
        preferences: aggregatedPreferences, // Remplace les préférences par la version agrégée
      };
    });
  }

  async ReturnSearchN(
    datas: any[],
    preferenceKey: any[],
  ): Promise<ProfilNounus[]> {
    return datas.map((data) => {
      // Regrouper les libellés similaires dans des tableaux distincts
      const aggregatedPreferences = {};

      preferenceKey.forEach((key) => {
        // Si aucune valeur n'a été filtrée, récupérer toutes les valeurs existantes
        aggregatedPreferences[key] = data.preferences
          .map((pref) => pref[key])
          .filter((value) => value !== undefined && value !== null)
          .flat(); // Aplatir les résultats pour éviter les tableaux imbriqués
      });

      return {
        ...data,
        image: data.user.medias.find(
          (media) => media.type_media.slug === 'image-profil',
        ),
        gallery: data.user.medias.filter(
          (media) => media.type_media.slug === 'gallery-image',
        ),
        imageDocuments: data.user.medias.filter(
          (media) => media.type_media.slug === 'document-verification',
        ),
        preferences: aggregatedPreferences, // Remplace les préférences par la version agrégée
      };
    });
  }
}
