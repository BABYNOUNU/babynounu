import { Inject, Injectable } from '@nestjs/common';
import { Parents } from './models/parent.model';
import { Repository } from 'typeorm';

@Injectable()
export class ParentService {
  constructor(
    @Inject('PARENT_REPOSITORY') private ParentsRepository: Repository<Parents>,
  ) {}

  

  async Parents(): Promise<Parents[]> {
    return this.ParentsRepository.find();
  }

  async Parent(ParentsWhereUniqueInput: any): Promise<Parents | null> {
    return this.ParentsRepository.findOne({
      where: ParentsWhereUniqueInput,
    });
  }

  async CreateParent(): Promise<Parents> {
    const newParents = this.ParentsRepository.create({});

    return await this.ParentsRepository.save(newParents);
  }


  async UpdateParent(): Promise<Parents> {
    const newParents = this.ParentsRepository.create({});

    return await this.ParentsRepository.save(newParents);
  }

  async DeleteParent(where: any) {
    this.ParentsRepository.delete({ id: where });
    return { message: 'Parents deleted' };
  }
}
