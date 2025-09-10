import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateApp } from './models/updateApp.model';
import { Repository, Like } from 'typeorm';

// DTOs interfaces (à créer dans des fichiers séparés si nécessaire)
interface CreateUpdateAppDto {
  appName?: string;
  version?: string;
  description?: string;
  isActive?: boolean;
  settings?: Record<string, any>;
}

interface UpdateUpdateAppDto {
  appName?: string;
  version?: string;
  description?: string;
  isActive?: boolean;
  settings?: Record<string, any>;
}

@Injectable()
export class AdministrateurService {
  constructor(
    @InjectRepository(UpdateApp)
    private readonly updateAppRepository: Repository<UpdateApp>,
  ) {}

  /**
   * Créer une nouvelle configuration d'application
   * @param createUpdateAppDto - Données de création
   * @returns La configuration créée
   */
  async create(createUpdateAppDto: CreateUpdateAppDto): Promise<UpdateApp> {
    try {
      const updateApp = this.updateAppRepository.create({
        ...createUpdateAppDto,
        lastUpdate: new Date(),
      });

      const savedUpdateApp = await this.updateAppRepository.save(updateApp);
      
      if (!savedUpdateApp) {
        throw new BadRequestException('Échec de la création de la configuration');
      }

      return savedUpdateApp;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(`Erreur lors de la création: ${error.message}`);
    }
  }

  /**
   * Récupérer toutes les configurations avec pagination
   * @param page - Numéro de page (défaut: 1)
   * @param limit - Nombre d'éléments par page (défaut: 10)
   * @returns Liste paginée des configurations
   */
  async findAll(page: number = 1, limit: number = 10): Promise<any> {
    try {
      // Validation et conversion des paramètres
      const pageNumber = Math.max(1, parseInt(page.toString(), 10) || 1);
      const limitNumber = Math.max(1, Math.min(100, parseInt(limit.toString(), 10) || 10));
      const skip = (pageNumber - 1) * limitNumber;

      // Récupération des données avec pagination
      const [data, totalCount] = await this.updateAppRepository.findAndCount({
        order: { lastUpdate: 'DESC' },
        skip,
        take: limitNumber,
      });

      // Calcul des métadonnées de pagination
      const totalPages = Math.ceil(totalCount / limitNumber);
      const hasNextPage = pageNumber < totalPages;
      const hasPreviousPage = pageNumber > 1;

      return {
        data,
        pagination: {
          currentPage: pageNumber,
          totalPages,
          totalItems: totalCount,
          itemsPerPage: limitNumber,
          hasNextPage,
          hasPreviousPage,
        },
      };
    } catch (error) {
      throw new BadRequestException(`Erreur lors de la récupération: ${error.message}`);
    }
  }

  /**
   * Récupérer une configuration par son ID
   * @param id - ID de la configuration
   * @returns La configuration trouvée
   */
  async findOne(id: number): Promise<UpdateApp> {
    try {
      const updateApp = await this.updateAppRepository.findOne({
        where: { id },
      });

      if (!updateApp) {
        throw new NotFoundException(`Configuration avec l'ID ${id} introuvable`);
      }

      return updateApp;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Erreur lors de la récupération: ${error.message}`);
    }
  }

  /**
   * Récupérer la configuration active
   * @returns La configuration active
   */
  async findActive(): Promise<UpdateApp> {
    try {
      const activeConfig = await this.updateAppRepository.findOne({
        where: { isActive: true },
        order: { lastUpdate: 'DESC' },
      });

      if (!activeConfig) {
        throw new NotFoundException('Aucune configuration active trouvée');
      }

      return activeConfig;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Erreur lors de la récupération: ${error.message}`);
    }
  }

  /**
   * Mettre à jour une configuration
   * @param id - ID de la configuration
   * @param updateUpdateAppDto - Données de mise à jour
   * @returns La configuration mise à jour
   */
  async update(id: number, updateUpdateAppDto: UpdateUpdateAppDto): Promise<UpdateApp> {
    try {
      // Vérifier que la configuration existe
      const existingUpdateApp = await this.findOne(id);

      // Mettre à jour les données
      const updateResult = await this.updateAppRepository.update(id, {
        ...updateUpdateAppDto,
        lastUpdate: new Date(),
      });

      if (updateResult.affected === 0) {
        throw new BadRequestException('Aucune modification effectuée');
      }

      // Retourner la configuration mise à jour
      return await this.findOne(id);
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(`Erreur lors de la mise à jour: ${error.message}`);
    }
  }

  /**
   * Supprimer une configuration
   * @param id - ID de la configuration
   * @returns Message de confirmation
   */
  async remove(id: number): Promise<{ message: string }> {
    try {
      // Vérifier que la configuration existe
      await this.findOne(id);

      // Supprimer la configuration
      const deleteResult = await this.updateAppRepository.delete(id);

      if (deleteResult.affected === 0) {
        throw new BadRequestException('Échec de la suppression');
      }

      return { message: `Configuration avec l'ID ${id} supprimée avec succès` };
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(`Erreur lors de la suppression: ${error.message}`);
    }
  }

  /**
   * Activer/Désactiver une configuration
   * @param id - ID de la configuration
   * @param isActive - Statut d'activation
   * @returns La configuration mise à jour
   */
  async toggleActive(id: number, isActive: boolean): Promise<UpdateApp> {
    try {
      // Si on active cette configuration, désactiver les autres
      if (isActive) {
        await this.updateAppRepository.update(
          { isActive: true },
          { isActive: false }
        );
      }

      return await this.update(id, { isActive });
    } catch (error) {
      throw new BadRequestException(`Erreur lors du changement de statut: ${error.message}`);
    }
  }

  /**
   * Rechercher des configurations par nom d'application
   * @param appName - Nom de l'application à rechercher
   * @param page - Numéro de page
   * @param limit - Nombre d'éléments par page
   * @returns Résultats de recherche paginés
   */
  async searchByAppName(appName: string, page: number = 1, limit: number = 10): Promise<any> {
    try {
      const pageNumber = Math.max(1, parseInt(page.toString(), 10) || 1);
      const limitNumber = Math.max(1, Math.min(100, parseInt(limit.toString(), 10) || 10));
      const skip = (pageNumber - 1) * limitNumber;

      const [data, totalCount] = await this.updateAppRepository.findAndCount({
        where: {
          appName: Like(`%${appName}%`),
        },
        order: { lastUpdate: 'DESC' },
        skip,
        take: limitNumber,
      });

      const totalPages = Math.ceil(totalCount / limitNumber);

      return {
        data,
        pagination: {
          currentPage: pageNumber,
          totalPages,
          totalItems: totalCount,
          itemsPerPage: limitNumber,
          hasNextPage: pageNumber < totalPages,
          hasPreviousPage: pageNumber > 1,
        },
        searchTerm: appName,
      };
    } catch (error) {
      throw new BadRequestException(`Erreur lors de la recherche: ${error.message}`);
    }
  }

  

  /**
   * Trouver une version spécifique et l'activer
   * @param version - Version à rechercher et activer
   * @returns La configuration de version activée
   */
  async findVersionToActive(version: string): Promise<UpdateApp> {
    try {
      // Rechercher la configuration avec la version spécifiée
      const versionConfig = await this.updateAppRepository.findOne({
        where: { version },
      });

      if (!versionConfig) {
        throw new NotFoundException(`Version ${version} introuvable`);
      }

      // Désactiver toutes les autres configurations
      await this.updateAppRepository.update(
        { isActive: true },
        { isActive: false, lastUpdate: new Date() }
      );

      // Activer la version trouvée
      await this.updateAppRepository.update(
        { id: versionConfig.id },
        { 
          isActive: true, 
          lastUpdate: new Date() 
        }
      );

      // Retourner la configuration mise à jour
      const updatedConfig = await this.updateAppRepository.findOne({
        where: { id: versionConfig.id },
      });

      return updatedConfig;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Erreur lors de l'activation de la version: ${error.message}`);
    }
  }

}
