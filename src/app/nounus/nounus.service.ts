import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Not, Repository } from 'typeorm';
import { Nounus } from './models/nounu.model';
import { CreateNounuDto } from './dtos/create-nounu.dto';
import { UpdateNounuDto } from './dtos/update-nounu.dto';
import { MediaService } from '../media/media.service';
import { HOST } from 'src/database/database.providers';
import { Preference } from '../Preference/models/preference.model';

@Injectable()
export class NounusService {
  constructor(
    @Inject('NOUNUS_REPOSITORY')
    private readonly nounuRepository: Repository<Nounus>,
    @Inject('PREFERENCE_REPOSITORY')
    private readonly preferenceRepository: Repository<Preference>,

    private readonly mediaService: MediaService,
  ) {}

  async create(
    createNounuDto: CreateNounuDto,
    files: {
      imageNounu: Express.Multer.File[];
      documents: Express.Multer.File[];
      gallery: Express.Multer.File[];
    },
  ): Promise<Nounus> {
    const { userId, ...nounuData } = createNounuDto;
    // Create and save the nounu
    const savedNounu = await this.nounuRepository.save({
      ...nounuData,
      urgences: nounuData.urgences === 'true' ? true : false,
      flexibilite_tarifaire:
        nounuData.flexibilite_tarifaire === 'true' ? true : false,
      user: { id: userId },
    });

    if (!savedNounu) {
      throw new BadRequestException('Nounu not created');
    }

    console.log(files);

    // Upload image if provided
    if (files.imageNounu?.length > 0) {
      // Image Nounu
      const imageNounu = files.imageNounu[0];
      await this.mediaService.create({
        originalName: imageNounu.originalname,
        filename: imageNounu.filename,
        path: imageNounu.path,
        originalUrl: `${HOST}/uploads/${imageNounu.filename}`,
        userId: userId,
        typeMedia: 'image-profil',
      });

      // Image Upload Documents
      if (files.documents?.length > 0) {
        for (const document of files.documents) {
          await this.mediaService.create({
            originalName: document.originalname,
            filename: document.filename,
            path: document.path,
            originalUrl: `${HOST}/uploads/${document.filename}`,
            userId: userId,
            typeMedia: 'document-verification',
          });
        }
      }

      // Image Upload Gallery
      if (files.gallery?.length > 0) {
        for (const gallery of files.gallery) {
          await this.mediaService.create({
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

    // Save preferences
    const preferenceKeys = [
      'zone_de_travail',
      'horaire_disponible',
      'adress',
      'tranche_age_enfants',
      'competance_specifique',
      'langue_parler',
      'certifications_criteres'
    ];

    for (const key of preferenceKeys) {
      const value = JSON.parse(createNounuDto[key]);
      if (Array.isArray(value)) {
        const preferenceEntities = value.map((el) => ({
          nounus: savedNounu,
          [key]: el.id,
        }));
        await this.preferenceRepository.save(preferenceEntities);
      }
    }

    return savedNounu;
  }

  async findAll(userId: any): Promise<any> {
    // Récupérer tous les nounous sauf celui connecté
    console.log(userId)
    const nounus = await this.nounuRepository.find({
      relations: [
        'user',
        'user.medias',
        'user.medias.type_media',
        'preferences',
        'preferences.zone_de_travail',
        'preferences.horaire_disponible',
        'preferences.adress',
        'preferences.tranche_age_enfants',
        'preferences.competance_specifique',
        'preferences.langue_parler',
        'preferences.certifications_criteres',
      ],
      where: {
        user: {
          id: Not(userId.userId), // Exclure l'utilisateur connecté
        },
      },
    });
  
    return await this.ReturnN(
      nounus,
      [
        'zone_de_travail',
        'horaire_disponible',
        'adress',
        'tranche_age_enfants',
        'competance_specifique',
        'langue_parler',
      ],
    );
  }

  async findOne(id: number): Promise<any> {
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
      throw new NotFoundException(`Nounus with ID ${id} not found`);
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
        'certifications_criteres'
      ],
    )

    return  nounuOne[0];
  }

  async update(
    id: string, // L'ID du Nounu à mettre à jour
    updateNounuDto: UpdateNounuDto,
    files: {
      imageNounu: Express.Multer.File[];
      documents: Express.Multer.File[];
      gallery: Express.Multer.File[];
    },
  ): Promise<Nounus> {
    const { userId, ...nounuData } = updateNounuDto;
  
    // Récupérer le Nounu existant
    const existingNounu = await this.nounuRepository.findOne({
      where: { id: +id },
      relations: ['user'],
    });
  
    if (!existingNounu) {
      throw new NotFoundException('Nounu not found');
    }
  
    // Mettre à jour les données du Nounu
    const updatedNounu = await this.nounuRepository.save({
      ...existingNounu,
      ...nounuData,
      urgences: nounuData.urgences === 'true' ? true : false,
      flexibilite_tarifaire:
        nounuData.flexibilite_tarifaire === 'true' ? true : false,
      user: { id: userId },
    });
  
    if (!updatedNounu) {
      throw new BadRequestException('Nounu not updated');
    }
  
    // Mettre à jour l'image de profil si fournie
    if (files.imageNounu?.length > 0) {
      const imageNounu = files.imageNounu[0];
      await this.mediaService.update(
        { id: existingNounu.user.id, typeMedia: 'image-profil' }, // Critères de recherche pour trouver l'image existante
        {
          originalName: imageNounu.originalname,
          filename: imageNounu.filename,
          path: imageNounu.path,
          originalUrl: `${HOST}/uploads/${imageNounu.filename}`,
        },
      );
    }
  
    // Mettre à jour les documents si fournis
    if (files.documents?.length > 0) {
      // Supprimer les anciens documents
      // await this.mediaService.deleteMany({ userId, typeMedia: 'document-verification' });
  
      // Ajouter les nouveaux documents
      for (const document of files.documents) {
        await this.mediaService.create({
          originalName: document.originalname,
          filename: document.filename,
          path: document.path,
          originalUrl: `${HOST}/uploads/${document.filename}`,
          userId: userId,
          typeMedia: 'document-verification',
        });
      }
    }
  
    // Mettre à jour la galerie si fournie
    if (files.gallery?.length > 0) {
      // Supprimer les anciennes images de la galerie
      // await this.mediaService.deleteMany({ userId, typeMedia: 'gallery-image' });
  
      // Ajouter les nouvelles images de la galerie
      for (const gallery of files.gallery) {
        await this.mediaService.create({
          originalName: gallery.originalname,
          filename: gallery.filename,
          path: gallery.path,
          originalUrl: `${HOST}/uploads/${gallery.filename}`,
          userId: userId,
          typeMedia: 'gallery-image',
        });
      }
    }
  
    // Mettre à jour les préférences
    const preferenceKeys = [
      'zone_de_travail',
      'horaire_disponible',
      'adress',
      'tranche_age_enfants',
      'competance_specifique',
      'langue_parler',
      'certifications_criteres'
    ];
  
    for (const key of preferenceKeys) {
      const value = JSON.parse(updateNounuDto[key]);
      if (Array.isArray(value)) {
        // Supprimer les anciennes préférences
        await this.preferenceRepository.delete({ nounus: updatedNounu });
      }
    }


    for (const key of preferenceKeys) {
      const value = JSON.parse(updateNounuDto[key]);
      if (Array.isArray(value)) {
        // Ajouter les nouvelles préférences
        const preferenceEntities = value.map((el) => ({
          nounus: updatedNounu,
          [key]: el.id,
        }));
        await this.preferenceRepository.save(preferenceEntities);
      }
    }
  
    return updatedNounu;
  }

  async remove(id: number): Promise<void> {
    const nounu = await this.findOne(id);
    await this.nounuRepository.remove(nounu);
  }

  async search(searchCriteria: any): Promise<any[]> {
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
  
    const whereConditions: any = {};

    if (fullname) {
      whereConditions.fullname = Like(`%${fullname}%`);
    }
    
    // Gestion des relations (préférences et utilisateur)
    const nounus = await this.nounuRepository.find({
      
      where: {
        ...whereConditions,
      },
      relations: [
        'user',
        'user.medias',
        'user.medias.type_media',
        'preferences',
        'preferences.zone_de_travail',
        'preferences.horaire_disponible',
        'preferences.adress',
        'preferences.tranche_age_enfants',
        'preferences.competance_specifique',
        'preferences.langue_parler',
        'preferences.certifications_criteres',
      ],
    });
    
  
  const nounuOne = await this.ReturnN(
    nounus,
    [
      'zone_de_travail',
      'horaire_disponible',
      'adress',
      'tranche_age_enfants',
      'competance_specifique',
      'langue_parler',
      'certifications_criteres'
    ],
  )

  return  nounuOne;
  }

  async ReturnN(datas: any[], preferenceKey: any[]): Promise<Nounus[]> {
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
    })
  }
}
