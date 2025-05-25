import { NounusService } from './../nounus/nounus.service';
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contracts } from './models/contracts.model';
import { CreateContractDto } from './dtos/create-contracts.dto';
import { UpdateContractDto } from './dtos/update-contracts.dto';
import { ProfilNounus } from '../nounus/models/nounu.model';
import { ProfilParents } from '../parent/models/parent.model';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class ContractsService {
  constructor(
    @Inject('CONTRACTS_REPOSITORY')
    private readonly contractsRepository: Repository<Contracts>,
    @Inject('NOUNUS_REPOSITORY')
    private readonly nounusRepository: Repository<ProfilNounus>,
    @Inject('PARENT_REPOSITORY')
    private readonly parentsRepository: Repository<ProfilParents>,
    private readonly notificationService: NotificationService,
    private readonly nounusService: NounusService
  ) {}

  async create(createContractDto: CreateContractDto): Promise<Contracts> {
    // Verify if contract exist
    const contractExist = await this.contractsRepository.findOne({
      where: {
        room: { id: createContractDto.roomId },
        message: { id: createContractDto.messageId },
      },
      relations: ['room', 'message'],
    });
    if (contractExist) {
      throw new BadRequestException('Contract already exist');
    }

    const newContract = this.contractsRepository.create({
      room: { id: createContractDto.roomId },
      message: { id: createContractDto.messageId },
    });
    const contract = await this.contractsRepository.save(newContract);

    // Get Le contrat
    const getContract = await this.findOne(contract.id);

    // Émet une notification
    await this.notificationService.createNotification({
      type: 'CONTRAT',
      userId: getContract.room.parent.user.id,
      message: `Vous avez une nouvelle missons chez ${getContract.room.parent.fullname} pour une durée de ${JSON.parse(getContract.message.content).duration}jours.`,
      is_read: false,
      senderUserId: getContract.room.nounou.user.id,
      tolinkId: getContract.id.toString(),
    });

    await this.notificationService.createNotification({
      type: 'CONTRAT',
      userId: getContract.room.nounou.user.id,
      message: `${getContract.room.nounou.fullname} à accepté votre mission chez (Vous) pour une durée de  ${JSON.parse(getContract.message.content).duration}jours.`,
      is_read: false,
      senderUserId: getContract.room.parent.user.id,
      tolinkId: getContract.id.toString(),
    });

   const StatusNu = await this.nounusService.updateStatus(getContract.room.nounou.user.id, 'indisponible')

    if(StatusNu){

      await this.notificationService.createNotification({
        type: 'PROFIL_DETAIL',
        userId: getContract.room.nounou.user.id,
        message: `Le statut de votre profil est passé en mode 'Indisponible', car vous avez déjà une mission en cours chez l'un de nos clients.`,
        is_read: false,
        senderUserId: getContract.room.nounou.user.id,
        tolinkId: getContract.id.toString(),
      });
      this.nounusService.decrementPoints(getContract.room.parent.user.id, 100);

    }

    return contract;
  }

  async findAll(): Promise<Contracts[]> {
    return this.contractsRepository.find({
      relations: {
        message: true,
        room: {
          nounou: {
            user: true,
          },
          parent: {
            user: true,
          },
        },
      },
    
    });
  }

  async findAllByUserId(userId: string): Promise<Contracts[]> {
    return this.contractsRepository.find({
      where: [
        {
          room: {
            parent: {
              user: { id: userId },
            },
          },
        },
        {
          room: {
            nounou: {
              user: { id: userId },
            },
          },
        },
      ],
      relations: {
        message: true,
        room: {
          nounou: {
            user: true,
          },
          parent: {
            user: true,
          },
        },
      },
    });
  }

  async findOne(id: number): Promise<any> {
    const contract = await this.contractsRepository.findOne({
      where: { id },
      relations: {
        message: {
          room: true,
        },
        room: {
          nounou: {
            user: {
              medias: {
                type_media: true,
              },
            },
          },
          parent: {
            user: {
              medias: {
                type_media: true,
              },
            },
          },
        },
      },
    });
    if (!contract) {
      throw new NotFoundException(`Contract with ID ${id} not found`);
    }
    return {
      ...contract,
      photoNounou: contract.room.nounou.user.medias?.find(
        (media) => media?.type_media.slug === 'image-profil',
      ),
      photoParent: contract.room.parent.user.medias?.find(
        (media) => media?.type_media?.slug === 'image-profil',
      ),
    };
  }

  async update(
    id: number,
    updateContractDto: UpdateContractDto,
  ): Promise<Contracts> {
    const contract = await this.findOne(id);
    const updated = this.contractsRepository.merge(contract, {
      room: { id: updateContractDto.roomId },
      message: { id: updateContractDto.messageId },
    });
    return this.contractsRepository.save(updated);
  }

  
  async updateStatus(id: number, status: 'Accepted' | 'Pending' | 'Canceled'): Promise<Contracts> {
    const contract = await this.findOne(id);
    const updated = this.contractsRepository.merge(contract, {
      status,
    });
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
