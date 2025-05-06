import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, In, Like, Not, Repository } from 'typeorm';
import { ProfilNounus } from './models/nounu.model';
import { CreateNounuDto } from './dtos/create-nounu.dto';
import { UpdateNounuDto } from './dtos/update-nounu.dto';
import { MediaService } from '../media/media.service';
import { HOST } from 'src/database/database.providers';
import { Preference } from '../Preference/models/preference.model';

@Injectable()
export class NounusService {
  constructor(
    @Inject('NOUNUS_REPOSITORY')
    private readonly nounuRepository: Repository<ProfilNounus>,
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
  ): Promise<ProfilNounus> {
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
      'certifications_criteres',
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

  async findAllNotCurrentUser(userId: any): Promise<any> {
    // Récupérer tous les nounous sauf celui connecté
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

    return await this.ReturnN(nounus, [
      'zone_de_travail',
      'horaire_disponible',
      'adress',
      'tranche_age_enfants',
      'competance_specifique',
      'langue_parler',
    ]);
  }

  async findAll(): Promise<any> {
    // Récupérer tous les nounous sauf celui connecté
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
    });

    return await this.ReturnN(nounus, [
      'zone_de_travail',
      'horaire_disponible',
      'adress',
      'tranche_age_enfants',
      'competance_specifique',
      'langue_parler',
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

    // Récupérer le Nounu existant
    const existingNounu = await this.nounuRepository.findOne({
      where: { id: id },
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
      'certifications_criteres',
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

  async updatePoints(id: string, points: number): Promise<ProfilNounus> {
    const nounu = await this.findOne(id);
    if (!nounu) {
      throw new NotFoundException(`ProfilNounus with ID ${id} not found`);
    }
    this.nounuRepository.increment({ id }, 'points', points);
    return nounu;
  }

  async remove(id: string): Promise<void> {
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

    // Récupérer toutes les nounous avec les relations nécessaires
    const _nounus = await this.nounuRepository.find({
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

    const nounus = await this.ReturnN(_nounus, [
      'zone_de_travail',
      'horaire_disponible',
      'adress',
      'tranche_age_enfants',
      'competance_specifique',
      'langue_parler',
      'certifications_criteres',
    ]);

    // Filtrer les nounous en fonction des critères de recherche
    const filteredNounus = nounus.filter((nounu: any) => {
      // Filtrer par nom complet (fullname)
      if (
        fullname &&
        !nounu.fullname?.toLowerCase().includes(fullname?.toLowerCase())
      ) {
        return false;
      }

      // Filtrer par description
      if (
        description &&
        !nounu.description?.toLowerCase().includes(description?.toLowerCase())
      ) {
        return false;
      }

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

    return filteredNounus;
  }

  async getNonCertifiedNounus(): Promise<any[]> {
    // Retrieve all nounus with necessary relations
    const _nounus = await this.nounuRepository.find({
      where: { certif: false },
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

  async approveCertification(nounuId: string): Promise<{ certif: boolean }> {
    const nounu = await this.nounuRepository.findOne({
      where: { id: nounuId },
    });

    if (!nounu) {
      throw new NotFoundException(`Nounu with id ${nounuId} not found`);
    }

    nounu.certif = true;
    await this.nounuRepository.save(nounu);

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
