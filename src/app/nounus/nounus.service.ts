import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  async findAll(): Promise<any> {
    const nounus = await this.nounuRepository
      .createQueryBuilder('nounu')
      .leftJoinAndSelect('nounu.user', 'user')
      .leftJoinAndSelect('user.medias', 'medias')
      .leftJoinAndSelect('medias.type_media', 'type_media')
      .leftJoinAndSelect('nounu.preferences', 'preferences')
      .leftJoinAndSelect('preferences.zone_de_travail', 'zone_de_travail')
      .leftJoinAndSelect('preferences.horaire_disponible', 'horaire_disponible')
      .leftJoinAndSelect('preferences.adress', 'adress')
      .leftJoinAndSelect(
        'preferences.tranche_age_enfants',
        'tranche_age_enfants',
      )
      .leftJoinAndSelect(
        'preferences.competance_specifique',
        'competance_specifique',
      )
      .leftJoinAndSelect('preferences.langue_parler', 'langue_parler')
      .getMany();

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
    )
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
      ],
    )

    return  nounuOne[0];
  }

  async update(id: number, updateNounuDto: UpdateNounuDto): Promise<Nounus> {
    const nounu = await this.findOne(id);
    Object.assign(nounu, updateNounuDto);
    return await this.nounuRepository.save(nounu);
  }

  async remove(id: number): Promise<void> {
    const nounu = await this.findOne(id);
    await this.nounuRepository.remove(nounu);
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
