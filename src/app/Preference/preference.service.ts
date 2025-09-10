import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Preference } from './models/preference.model';

@Injectable()
export class PreferenceService {
  constructor(
    @InjectRepository(Preference)
    private readonly preferenceRepository: Repository<Preference>,
  ) {}

  findAll(): Promise<Preference[]> {
    return this.preferenceRepository.find();
  }

  findOne(id: number): Promise<Preference> {
    return this.preferenceRepository.findOne({ where: { id } });
  }
}