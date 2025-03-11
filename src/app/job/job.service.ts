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
    'taches',
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

    console.log(jobUser);
    const DataJob = await this.ReturnN(jobUser, this.preferenceKeys);
    return DataJob;
  }

  async updateJob(
    id: string, // L'ID du job à mettre à jour
    updateJobDto: UpdateJobDto,
    files: any,
  ): Promise<any> {
    const { user_id, ...jobData } = updateJobDto;
  
    // Récupérer le job existant
    const existingJob = await this.jobRepository.findOne({
      where: { id: +id },
      relations: ['user'],
    });
  
    if (!existingJob) {
      throw new NotFoundException('Job not found');
    }
  
    // Mettre à jour les données du job
    const updatedJob = await this.jobRepository.save({
      ...existingJob,
      titre: jobData.titre || existingJob.titre,
      description: jobData.description || existingJob.description,
      moyens_de_contact: jobData.moyens_de_contact || existingJob.moyens_de_contact,
      inclusWeekend: jobData.inclus_weekend === 'true' ? true : false,
      nombreEnfants: jobData.nombre_enfants || existingJob.nombreEnfants,
      experience_minimun: jobData.experience_minimun === 'true' ? true : false,
      annee_experience: jobData.annee_experience || existingJob.annee_experience,
      tarifPropose: jobData.tarif || existingJob.tarifPropose,
      negociable: jobData.negociable === 'true' ? true : false,
      dateDebut: jobData.date_debut || existingJob.dateDebut,
      missionUrgente: jobData.mission_urgente === 'true' ? true : false,
      descriptionComplementaire: jobData.description_complementaire || existingJob.descriptionComplementaire,
      user: { id: user_id || existingJob.user.id },
    });
  
    if (!updatedJob) {
      throw new BadRequestException('Job not updated');
    }
  
    // Mettre à jour les fichiers (Images_videos)
    if (files.Images_videos?.length > 0) {
      // Supprimer les anciens fichiers associés au job
      await this.mediaService.deleteManyJob({ JobId: updatedJob.id.toString(), typeMedia: 'image-video-presentation' });
  
      // Ajouter les nouveaux fichiers
      const Images_videos = files.Images_videos;
      Images_videos.forEach(async (file: any) => {
        await this.mediaService.create({
          originalName: file.originalname,
          filename: file.filename,
          path: file.path,
          originalUrl: `${HOST}/uploads/${file.filename}`,
          JobId: updatedJob.id.toString(),
          typeMedia: 'image-video-presentation',
        });
      });
    }
  
    // Mettre à jour les préférences
    const preferenceKeys = this.preferenceKeys;
  
    for (const key of preferenceKeys) {
      const value = JSON.parse(updateJobDto[key]);
      if (value != undefined && Array.isArray(value)) {
        // Supprimer les anciennes préférences
        await this.preferenceRepository.delete({ jobs: updatedJob });
  
        // Ajouter les nouvelles préférences
        const preferenceEntities = value.map((el) => ({
          jobs: updatedJob,
          [key]: el.id,
        }));
        await this.preferenceRepository.save(preferenceEntities);
      }
    }
  
    // Récupérer le job mis à jour
    const job = await this.findJobById(updatedJob.id);
  
    if (!job) {
      throw new NotFoundException(`Job with ID ${updatedJob.id} not found`);
    }
  
    return job;
  }
  async deleteJob(id: number) {
    const job = await this.findJobById(id)
    console.log(job)
    return this.jobRepository.softDelete({ id: job.id });
  }

  async getJobApplyByUserId(userId: string) {
    const jobUser = await this.jobRepository.find({
      where: { jobApplications: { user: { id: userId } } },
      relations: this.RelationShip,
    });
    if (!jobUser) {
      throw new NotFoundException(`Job with ID ${jobUser} not found`);
    }
    console.log(jobUser);
    const DataJob = await this.ReturnN(jobUser, this.preferenceKeys);
    return DataJob;
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
