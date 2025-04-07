import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contracts } from './models/contracts.model';
import { CreateContractDto } from './dtos/create-contracts.dto';
import { UpdateContractDto } from './dtos/update-contracts.dto';
import { Nounus } from '../nounus/models/nounu.model';
import { Parents } from '../parent/models/parent.model';
import { NotificationService } from '../notification/notification.service';


@Injectable()
export class ContractsService {
  constructor(
    @Inject("CONTRACTS_REPOSITORY")
    private readonly contractsRepository: Repository<Contracts>,
    @Inject("NOUNUS_REPOSITORY")
    private readonly nounusRepository: Repository<Nounus>,
    @Inject("PARENT_REPOSITORY")
    private readonly parentsRepository: Repository<Parents>,
    private readonly notificationService: NotificationService
  ) {}

  async create(createContractDto: CreateContractDto): Promise<Contracts> {
    const nounu = await this.nounusRepository.findOne({
      where: { id: createContractDto.nounuId }, relations: {user: true}
    });
    if (!nounu) {
      throw new NotFoundException('Nounu not found');
    }

    const parent = await this.parentsRepository.findOne({
      where: { id: createContractDto.parentId }, relations: {user: true}
    });
    if (!parent) {
      throw new NotFoundException('Parent not found');
    }

    const contract = this.contractsRepository.create({
      ...createContractDto,
      nounu,
      parent,
    });

     // Émet une notification
     await this.notificationService.createNotification({
        type: 'CONTRAT',
        userId: nounu.user.id ,
        message: `La missions de ${nounu.fullname} a bien été validé.`,
        is_read: false,
        senderUserId: parent.user.id,
      });

    return this.contractsRepository.save(contract);
  }

  async findAll(): Promise<Contracts[]> {
    return this.contractsRepository.find({
      relations: ['nounu', 'parent'],
    });
  }

  async findOne(id: number): Promise<Contracts> {
    const contract = await this.contractsRepository.findOne({
      where: { id },
      relations: ['nounu', 'parent'],
    });
    if (!contract) {
      throw new NotFoundException(`Contract with ID ${id} not found`);
    }
    return contract;
  }

  async update(
    id: number,
    updateContractDto: UpdateContractDto,
  ): Promise<Contracts> {
    const contract = await this.findOne(id);
    const updated = this.contractsRepository.merge(contract, updateContractDto);
    return this.contractsRepository.save(updated);
  }

  async remove(id: number): Promise<void> {
    const result = await this.contractsRepository.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Contract with ID ${id} not found`);
    }
  }

  async restore(id: number): Promise<Contracts> {
    const result = await this.contractsRepository.restore(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Contract with ID ${id} not found`);
    }
    return this.findOne(id);
  }
}