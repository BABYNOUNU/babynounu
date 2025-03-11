// src/job-applications/job-applications.service.ts

import { Injectable, NotFoundException, Inject } from '@nestjs/common';

import { Repository } from 'typeorm';
import { JobApplication } from './models/job-application.model';
import { CreateJobApplicationDto } from './dto/create-job-application.dto';
import { UpdateJobApplicationDto } from './dto/update-job-application.dto';
import { User } from '../user/user.model';
import { Job } from '../job/models/job.model';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class JobApplicationsService {
  constructor(
    @Inject('JOB_APPLICATION_REPOSITORY')
    private readonly jobApplicationRepository: Repository<JobApplication>,
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<User>,
    @Inject('JOB_REPOSITORY')
    private readonly jobRepository: Repository<Job>,
    private readonly notificationService: NotificationService,
  ) {}

  private RelationShip = [
    'user', 'user.nounu', 'user.medias', 'user.medias.type_media',
    'medias',
    'jobs',
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

  async findAll(): Promise<JobApplication[]> {
    return this.jobApplicationRepository.find({ relations: ['user', 'job'] });
  }

  async findOne(id: number): Promise<JobApplication> {
    const jobApplication = await this.jobApplicationRepository.findOne({
      where: { id },
      relations: ['user', 'job'],
    });

    if (!jobApplication) {
      throw new NotFoundException(`JobApplication with ID ${id} not found`);
    }

    return jobApplication;
  }

  async create(
    createJobApplicationDto: CreateJobApplicationDto,
    userId: string,
  ): Promise<JobApplication> {
    const { userId: applicantUserId, jobId } = createJobApplicationDto;
  
    // Vérifier si l'utilisateur a déjà postulé à ce job
    const existingApplication = await this.jobApplicationRepository.findOne({
      where: {
        user: { id: applicantUserId.toString() },
        jobs: { id: jobId },
      },
      select: ['id', 'is_apply'], // Récupérer uniquement les champs nécessaires
    });
  
    // Si une candidature existe déjà, basculer l'état de is_apply
    if (existingApplication) {
      const newApplyStatus = !existingApplication.is_apply; // Inverser l'état actuel
      await this.jobApplicationRepository.update(
        { id: existingApplication.id },
        { is_apply: newApplyStatus },
      );
  
      // Mettre à jour l'objet existant pour le retourner
      existingApplication.is_apply = newApplyStatus;
      return existingApplication;
    }
  
    // Créer une nouvelle candidature
    const newJobApplication = this.jobApplicationRepository.create({
      is_apply: true,
      user: { id: applicantUserId.toString() },
      jobs: { id: jobId },
    });
  
    // Sauvegarder la nouvelle candidature
    const savedJobApplication = await this.jobApplicationRepository.save(
      newJobApplication,
    );
  
    if (!savedJobApplication) {
      throw new NotFoundException(
        `Job with ID ${jobId} not found or could not be applied to.`,
      );
    }
  
    // Envoyer une notification à l'utilisateur
    await this.sendJobApplicationNotification(applicantUserId.toString(), jobId.toString(), userId);
  
    return savedJobApplication;
  }
  
  /**
   * Envoie une notification à l'utilisateur après une candidature à un job.
   * @param applicantUserId - L'ID de l'utilisateur qui postule.
   * @param jobId - L'ID du job auquel l'utilisateur a postulé.
   * @param senderUserId - L'ID de l'utilisateur qui envoie la notification.
   */
  private async sendJobApplicationNotification(
    applicantUserId: string,
    jobId: string,
    senderUserId: string,
  ): Promise<void> {
    await this.notificationService.createNotification({
      type: 'JOBS',
      userId: applicantUserId,
      message: `You have applied to job ${jobId}`,
      is_read: false,
      senderUserId: senderUserId,
    });
  }

  async update(
    id: number,
    updateJobApplicationDto: UpdateJobApplicationDto,
  ): Promise<JobApplication> {
    const jobApplication = await this.jobApplicationRepository.preload({
      id,
      ...updateJobApplicationDto,
    });

    if (!jobApplication) {
      throw new NotFoundException(`JobApplication with ID ${id} not found`);
    }

    if (updateJobApplicationDto.userId) {
      const user = await this.userRepository.findOne({
        where: { id: updateJobApplicationDto.userId.toString() },
      });

      if (!user) {
        throw new NotFoundException(
          `User with ID ${updateJobApplicationDto.userId} not found`,
        );
      }

      jobApplication.user = user;
    }

    if (updateJobApplicationDto.jobId) {
      const job = await this.jobRepository.findOne({
        where: { id: updateJobApplicationDto.jobId },
      });

      if (!job) {
        throw new NotFoundException(
          `Job with ID ${updateJobApplicationDto.jobId} not found`,
        );
      }
    }

    return this.jobApplicationRepository.save(jobApplication);
  }

  async remove(id: number): Promise<void> {
    const result = await this.jobApplicationRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`JobApplication with ID ${id} not found`);
    }
  }

  async getJobApplyByUser(userId: string): Promise<any[]> {
    try {
      const jobApplicationUser = await this.jobApplicationRepository.find({
        where: { jobs: { user: {id: userId} } },
        relations: ['jobs', 'user', 'user.nounu', 'user.medias', 'user.medias.type_media'],
      });
      if (!jobApplicationUser) {
        throw new NotFoundException(`JobApplication with ID ${jobApplicationUser} not found`);
      }

      const _jobApplicationUser = jobApplicationUser.map((data) => {
        
        return {
          ...data,
          image: data.user.medias?.find((media) => media.type_media.slug === 'image-profil'),
        }
      })

      return _jobApplicationUser;
    } catch (error) {
      console.log(error)
    }
  }

  async GetJobApplyByUserId(userId: string): Promise<any[]> {
    const jobApplicationUser = await this.jobApplicationRepository.find({
      where: { user: {id: userId } },
      relations: this.RelationShip,
    });
    if (!jobApplicationUser) {
      throw new NotFoundException(`JobApplication with ID ${jobApplicationUser} not found`);
    }

    const _jobApplicationUser = jobApplicationUser.map((data) => {
      
      return {
        ...data,
        image: data.user.medias?.find((media) => media.type_media.slug === 'image-profil'),
      }
    })

    return _jobApplicationUser.map((data) => {
      return {
        ...data,
        job: {
          ...data.jobs,
          image: data.jobs.user.medias?.find((media) => media.type_media.slug === 'image-profil'),
        }
      }
    })

  }

}
