import { AdministrateurService } from './administrateur.service';
import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Body, 
  Param, 
  Query, 
  ParseIntPipe,
  HttpStatus 
} from '@nestjs/common';
import { 
  ApiTags, 
  ApiOperation, 
  ApiResponse, 
  ApiParam, 
  ApiQuery, 
  ApiBody 
} from '@nestjs/swagger';

// DTOs pour Swagger
class CreateUpdateAppDto {
  appName?: string;
  version?: string;
  description?: string;
  isActive?: boolean;
  settings?: Record<string, any>;
}

class UpdateUpdateAppDto {
  appName?: string;
  version?: string;
  description?: string;
  isActive?: boolean;
  settings?: Record<string, any>;
}

class ToggleActiveDto {
  isActive: boolean;
}

@ApiTags('Administrateur')
@Controller('administrateur')
export class AdministrateurController {
  constructor(private readonly administrateurService: AdministrateurService) {}

  @Post()
  @ApiOperation({ summary: 'Créer une nouvelle configuration d\'application' })
  @ApiBody({ type: CreateUpdateAppDto })
  @ApiResponse({ 
    status: HttpStatus.CREATED, 
    description: 'Configuration créée avec succès' 
  })
  @ApiResponse({ 
    status: HttpStatus.BAD_REQUEST, 
    description: 'Données invalides' 
  })
  async create(@Body() createUpdateAppDto: CreateUpdateAppDto) {
    return await this.administrateurService.create(createUpdateAppDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer toutes les configurations avec pagination' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Numéro de page (défaut: 1)' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Nombre d\'éléments par page (défaut: 10)' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Liste des configurations récupérée avec succès' 
  })
  async findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number
  ) {
    return await this.administrateurService.findAll(page, limit);
  }

  @Get('active')
  @ApiOperation({ summary: 'Récupérer la configuration active' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Configuration active récupérée avec succès' 
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Aucune configuration active trouvée' 
  })
  async findActive() {
    return await this.administrateurService.findActive();
  }

  @Get('search')
  @ApiOperation({ summary: 'Rechercher des configurations par nom d\'application' })
  @ApiQuery({ name: 'appName', required: true, type: String, description: 'Nom de l\'application à rechercher' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Numéro de page (défaut: 1)' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Nombre d\'éléments par page (défaut: 10)' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Résultats de recherche récupérés avec succès' 
  })
  async searchByAppName(
    @Query('appName') appName: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number
  ) {
    return await this.administrateurService.searchByAppName(appName, page, limit);
  }

  @Get('check-update')
  @ApiOperation({ summary: 'Vérifier et activer une version spécifique' })
  @ApiQuery({ name: 'version', required: true, type: String, description: 'Version à rechercher et activer' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Version activée avec succès' 
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Version introuvable' 
  })
  async checkUpdate(@Query('version') version: string) {
    return await this.administrateurService.findVersionToActive(version);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une configuration par son ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID de la configuration' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Configuration récupérée avec succès' 
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Configuration introuvable' 
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.administrateurService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Mettre à jour une configuration' })
  @ApiParam({ name: 'id', type: Number, description: 'ID de la configuration' })
  @ApiBody({ type: UpdateUpdateAppDto })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Configuration mise à jour avec succès' 
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Configuration introuvable' 
  })
  @ApiResponse({ 
    status: HttpStatus.BAD_REQUEST, 
    description: 'Données invalides' 
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUpdateAppDto: UpdateUpdateAppDto
  ) {
    return await this.administrateurService.update(id, updateUpdateAppDto);
  }

  @Put(':id/toggle-active')
  @ApiOperation({ summary: 'Activer/Désactiver une configuration' })
  @ApiParam({ name: 'id', type: Number, description: 'ID de la configuration' })
  @ApiBody({ type: ToggleActiveDto })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Statut de la configuration modifié avec succès' 
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Configuration introuvable' 
  })
  async toggleActive(
    @Param('id', ParseIntPipe) id: number,
    @Body() toggleActiveDto: ToggleActiveDto
  ) {
    return await this.administrateurService.toggleActive(id, toggleActiveDto.isActive);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une configuration' })
  @ApiParam({ name: 'id', type: Number, description: 'ID de la configuration' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Configuration supprimée avec succès' 
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Configuration introuvable' 
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.administrateurService.remove(id);
  }
}
