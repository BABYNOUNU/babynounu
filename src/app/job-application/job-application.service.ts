// src/app/job-application/job-application.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
    @InjectRepository(JobApplication)
    private readonly jobApplicationRepository: Repository<JobApplication>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
    private readonly notificationService: NotificationService,
  ) {}

  private RelationShip = [
    'user',
    'user.nounu',
    'user.medias',
    'user.medias.type_media',
    'jobs',
    'jobs.medias',
    'jobs.medias.type_media',
    'jobs.user',
    'jobs.user.medias',
    'jobs.user.medias.type_media',
    'jobs.preferences',
    'jobs.preferences.besions_specifiques',
    'jobs.preferences.garde_enfants',
    'jobs.preferences.aide_menagere',
    'jobs.preferences.frequence_des_services',
    'jobs.preferences.horaire_souhaites',
    'jobs.preferences.adress',
    'jobs.preferences.zone_geographique_prestataire',
    'jobs.preferences.competance_specifique',
    'jobs.preferences.langue_parler',
    'jobs.preferences.disponibility_du_prestataire',
    'jobs.preferences.equipement_menager',
    'jobs.preferences.criteres_specifiques',
    'jobs.preferences.criteres_selections',
    'jobs.preferences.certifications_criteres',
    'jobs.preferences.zone_de_travail',
    'jobs.preferences.type_services'
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
        user: { id: userId },
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
      user: { id: userId },
      jobs: { id: jobId },
    });

    // Sauvegarder la nouvelle candidature
    const savedJobApplication =
      await this.jobApplicationRepository.save(newJobApplication);

    if (!savedJobApplication) {
      throw new NotFoundException(
        `Job with ID ${jobId} not found or could not be applied to.`,
      );
    }

    // Envoyer une notification à l'utilisateur
    await this.sendJobApplicationNotification(
      userId,
      jobId.toString(),
      applicantUserId.toString(),
    );

    return savedJobApplication;
  }

  /**
   * Envoie une notification à l'utilisateur après une candidature à un job.
   * @param applicantUserId - L'ID de l'utilisateur qui postule.
   * @param jobId - L'ID du job auquel l'utilisateur a postulé.
   * @param senderUserId - L'ID de l'utilisateur qui envoie la notification.
   */
  private async sendJobApplicationNotification(
    userId: string,
    jobId: string,
    senderUserId: string,
  ): Promise<void> {
    await this.notificationService.createNotification({
      type: 'JOBS',
      userId: userId,
      message: `Semble être interessé par votre offre d'emploi`,
      is_read: false,
      senderUserId: senderUserId,
      jobId: +jobId,
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
        where: { jobs: { user: { id: userId } }, is_apply: true },
        relations: [
          'jobs',
          'user',
          'user.nounu',
          'user.medias',
          'user.medias.type_media',
        ],
      });
      if (!jobApplicationUser) {
        throw new NotFoundException(
          `JobApplication with ID ${jobApplicationUser} not found`,
        );
      }

      const _jobApplicationUser = jobApplicationUser.map((data) => {
        // Vérifier si user et medias existent avant d'accéder à medias
        const profileImage = data.user && data.user.medias ? 
          data.user.medias.find(media => media.type_media && media.type_media.slug === 'image-profil') : 
          null;
          
        return {
          ...data,
          image: profileImage,
        };
      });

      return _jobApplicationUser;
    } catch (error) {
      console.log(error);
    }
  }


  async getJobToApplyByUser(userId: string): Promise<any[]> {
    try {
      const jobApplicationUser = await this.jobApplicationRepository.find({
        where: { jobs: { jobApplications: { user: { id: userId } } }, is_apply: true },
        relations: [
          'jobs',
          'user',
          'user.nounu',
          'user.medias',
          'user.medias.type_media',
        ],
      });
      if (!jobApplicationUser) {
        throw new NotFoundException(
          `JobApplication with ID ${jobApplicationUser} not found`,
        );
      }

      const _jobApplicationUser = jobApplicationUser.map((data) => {
        // Vérifier si user et medias existent avant d'accéder à medias
        const profileImage = data.user && data.user.medias ? 
          data.user.medias.find(media => media.type_media && media.type_media.slug === 'image-profil') : 
          null;
          
        return {
          ...data,
          image: profileImage,
        };
      });

      return _jobApplicationUser;
    } catch (error) {
      console.log(error);
    }
  }

  async GetJobApplyByUserId(userId: string): Promise<any[]> {
    const jobApplicationUser = await this.jobApplicationRepository.find({
      where: { user: { id: userId } },
      relations: this.RelationShip,
    });
    if (!jobApplicationUser || jobApplicationUser.length === 0) {
      return []
    }

    const _jobApplicationUser = jobApplicationUser.map((data) => {
      // Vérifier si user et medias existent avant d'accéder à medias
      const profileImage = data.user && data.user.medias ? 
        data.user.medias.find(media => media.type_media && media.type_media.slug === 'image-profil') : 
        null;
        
      return {
        ...data,
        image: profileImage,
      };
    });

    return _jobApplicationUser.map((data) => {
      return {
        ...data,
        job: {
          ...data.jobs,
          image: data.jobs.user.medias?.find(
            (media) => media.type_media.slug === 'image-profil',
          ),
        },
      };
    });
  }
}
