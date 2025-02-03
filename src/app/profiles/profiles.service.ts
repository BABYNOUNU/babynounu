// src/profiles/profiles.service.ts

import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './models/profile.model';
import { User } from '../user/user.model';
import { TypeParameter } from '../parameter/models/parameter_type.model';
import { Preference } from '../Preference/models/preference.model';
import { CreateProfileDto } from './dtos/create-profile.dto';
import { UpdateProfileDto } from './dtos/update-profile.dto';
import { Parameter } from '../parameter/models/parameter.model';

@Injectable()
export class ProfilesService {
   constructor(
      @Inject('PROFILE_REPOSITORY')
      private readonly profileRepository: Repository<Profile>,
      @Inject('USER_REPOSITORY')
      private readonly userRepository: Repository<User>,
      @Inject('PARAMETER_REPOSITORY')
      private readonly parameterRepository: Repository<Parameter>,
      @Inject('PREFERENCE_REPOSITORY')
      private readonly preferenceRepository: Repository<Preference>,
   ) {}

   async createProfile(createProfileDto: CreateProfileDto): Promise<Profile> {
      const { firstName, lastName, bio, level, userId, typeId, preferenceId } = createProfileDto;

      const user = await this.userRepository.findOne({ where: { id: userId.toString() } });
      if (!user) {
         throw new NotFoundException(`User with ID ${userId} not found`);
      }

      const parameter = await this.parameterRepository.findOne({ where: { id: typeId } });
      if (!parameter) {
         throw new NotFoundException(`TypeParameter with ID ${typeId} not found`);
      }

      const preference = await this.preferenceRepository.findOne({ where: { id: preferenceId } });
      if (!preference) {
         throw new NotFoundException(`Preference with ID ${preferenceId} not found`);
      }

      const profile = this.profileRepository.create({
         firstName,
         lastName,
         bio,
         level,
         user: {
            preference: {
                localization: [{ id: preferenceId }]
            }
         },
         type: parameter
      });

      return this.profileRepository.save(profile);
   }

   async updateProfile(id: number, updateProfileDto: UpdateProfileDto): Promise<Profile> {
      const profile = await this.profileRepository.findOne({ where: { id } });
      if (!profile) {
         throw new NotFoundException(`Profile with ID ${id} not found`);
      }

      if (updateProfileDto.typeParameterId) {
         const parameter = await this.parameterRepository.findOne({
            where: { id: updateProfileDto.typeParameterId },
         });
         if (!parameter) {
            throw new NotFoundException(`TypeParameter with ID ${updateProfileDto.typeParameterId} not found`);
         }
         profile.type = parameter;
      }

      if (updateProfileDto.preferenceId) {
         const preference = await this.preferenceRepository.findOne({
            where: { id: updateProfileDto.preferenceId },
         });
         if (!preference) {
            throw new NotFoundException(`Preference with ID ${updateProfileDto.preferenceId} not found`);
         }
         profile.user.preference = preference;
      }

      Object.assign(profile, updateProfileDto);
      return this.profileRepository.save(profile);
   }

   async getProfileById(id: number): Promise<Profile> {
      const profile = await this.profileRepository.findOne({
         where: { id },
         relations: ['user', 'typeParameter', 'preference'],
      });

      if (!profile) {
         throw new NotFoundException(`Profile with ID ${id} not found`);
      }

      return profile;
   }
}