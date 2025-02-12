import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from './models/job.model';
import { CreateJobDto } from './dtos/create-job.dto';
import { UpdateJobDto } from './dtos/update-job.dto';
import { Preference } from '../Preference/models/preference.model';
import { MediaService } from '../media/media.service';
import { HOST } from 'src/database/database.providers';

@Injectable()
export class JobsService {
  constructor(
    @Inject('JOB_REPOSITORY')
    private jobRepository: Repository<Job>,
    @Inject('PREFERENCE_REPOSITORY')
    private readonly preferenceRepository: Repository<Preference>,
    private readonly mediaService: MediaService,
  ) {}

  private RelationShip = [
    'user',
    'user.parent',
    'medias',
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
    'preferences.equipement_menager',
    'preferences.criteres_specifiques',
    'preferences.criteres_selections',
    'preferences.certifications_criteres',
    'preferences.zone_de_travail',
    'preferences.type_services',
    'jobApplications',
  ];

  private preferenceKeys = [
    'adress',
    'zone_de_travail',
    'type_services',
    'frequence_des_services',
    'horaire_souhaites',
    'garde_enfants',
    'competance_specifique',
    'besions_specifiques',
    'langue_parler',
    'aide_menagere',
    'equipement_menager',
    'certifications_criteres',
    'criteres_selections',
  ];

  async createJob(createJobDto: CreateJobDto, files: any) {
    const { user_id, ...jobData } = createJobDto;

    // Create and save the parent
    const saveJob = await this.jobRepository.save({
      titre: jobData.titre,
      description: jobData.description,
      moyens_de_contact: jobData.moyens_de_contact,
      inclusWeekend: jobData.inclus_weekend == 'true' ? true : false,
      nombreEnfants: jobData.nombre_enfants,
      experience_minimun: jobData.experience_minimun == 'true' ? true : false,
      annee_experience: jobData.annee_experience,
      tarifPropose: jobData.tarif,
      negociable: jobData.negociable == 'true' ? true : false,
      dateDebut: jobData.date_debut,
      missionUrgente: jobData.mission_urgente == 'true' ? true : false,
      descriptionComplementaire: jobData.description_complementaire,
      user: { id: user_id },
    });

    if (!saveJob) {
      throw new BadRequestException('Job not created');
    }

    // Upload image if provided
    if (files.Images_videos?.length > 0) {
      // Image Nounu
      const Images_videos = files.Images_videos;
      Images_videos.forEach(async (file: any) => {
        await this.mediaService.create({
          originalName: file.originalname,
          filename: file.filename,
          path: file.path,
          originalUrl: `${HOST}/uploads/${file.filename}`,
          JobId: saveJob.id.toString(),
          typeMedia: 'image-video-presentation',
        });
      });
    }

    // Save preferences
    const preferenceKeys = this.preferenceKeys;

    for (const key of preferenceKeys) {
      const value = JSON.parse(createJobDto[key]);
      if (value != undefined && Array.isArray(value)) {
        const preferenceEntities = value.map((el) => ({
          jobs: saveJob,
          [key]: el.id,
        }));
        await this.preferenceRepository.save(preferenceEntities);
      }
    }

    // Get Job
    const job = await this.findJobById(saveJob.id);

    if (!job) {
      throw new NotFoundException(`Job with ID ${saveJob.id} not found`);
    }

    return job;
  }

  async findAllJobs() {
    const job = await this.jobRepository.find({
      relations: this.RelationShip,
    });
    const DataJobs = await this.ReturnN(job, this.preferenceKeys);
    return DataJobs;
  }

  async findJobById(id: number) {
    const job = await this.jobRepository.findOne({
      where: { id },
      relations: this.RelationShip,
    });
    if (!job) {
      throw new NotFoundException(`Job with ID ${id} not found`);
    }

    const DataJob = await this.ReturnN([job], this.preferenceKeys);
    return DataJob[0] ;
  }

  async findAllJobByUser(userId: string) {
    const jobUser = await this.jobRepository.find({
      where: { user: { id: userId } },
      relations: this.RelationShip,
    });
    if (!jobUser) {
      throw new NotFoundException(`Job with ID ${jobUser} not found`);
    }
    return jobUser;
  }

  async updateJob(id: number, updateJobDto: UpdateJobDto) {
    const job = await this.findJobById(id)[0];
    Object.assign(job, updateJobDto);
    return this.jobRepository.save(job);
  }

  async deleteJob(id: number) {
    const job = await this.findJobById(id)
    console.log(job)
    return this.jobRepository.softDelete({ id: job.id });
  }
 
  async ReturnN(datas: any[], preferenceKey: any[]): Promise<Job[]> {
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
        // image_presentation: data.medias.find(
        //   (media) => media.type_media.slug === 'image-video-presentation',
        // ),
        image: data.user.medias.find(
          (media) => media.type_media.slug === 'image-profil',
        ),
        preferences: aggregatedPreferences, // Remplace les préférences par la version agrégée
      };
    });
  }
}
