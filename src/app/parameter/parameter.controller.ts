// src/parameters/parameter.controller.ts
import {
  Controller,
  Get,
  Post,
  Query,
  Body,
  Param,
  Res,
  Put,
  Delete,
 } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ParameterService } from './parameter.service';
import { CreateParameterDto } from './dto/parameter.dto';
import { Response } from 'express';

@ApiTags('Parameters')
@Controller('parameters')
export class ParameterController {
  constructor(private readonly parameterService: ParameterService) {}

  // Liste tous les paramètres
  @Get()
  @ApiOperation({ summary: 'Obtenir tous les paramètres' })
  @ApiResponse({ status: 200, description: 'Liste des paramètres.' })
  async index(@Res() res: Response) {
    try {
      const parameters = await this.parameterService.findAll();
      return res.send({ parameter: parameters });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: 'Server error' });
    }
  }

  // Récupère les paramètres en fonction du type
  @Get('query')
  @ApiOperation({ summary: 'Obtenir les paramètres par type' })
  @ApiResponse({
    status: 200,
    description: 'Liste des paramètres filtrés par type.',
  })
  async indexQuery(
    @Query('type_parametre') typeParametre: string,
    @Res() res: Response,
  ) {
    try {
      const parameters = await this.parameterService.findByType(typeParametre);
      return res.send({ parameter: parameters });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: 'Server error' });
    }
  }


  // Récupère les paramètres en fonction du slug
  @Get('slug/:slug')
  @ApiOperation({ summary: 'Obtenir les paramètres par slug' })
  @ApiResponse({
    status: 200,
    description: 'Liste des paramètres filtrés par slug.',
  })
  async findAllBySlug(
    @Param('slug') typeParmaSlug: string,
    @Res() res: Response,
  ) {
    try {
      const parameters = await this.parameterService.findAllBySlug(typeParmaSlug);
      return res.send({ parameter: parameters });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: 'Server error' });
    }
  }

  // Récupère un paramètre en fonction du slug
  @Get('slug/one/:slug')
  @ApiOperation({ summary: 'Obtenir un paramètre par slug' })
  @ApiResponse({
    status: 200,
    description: 'Paramètre filtré par slug.',
  })
  async findOneBySlug(
    @Param('slug') typeParmaSlug: string,
    @Res() res: Response,
  ) {
    try {
      const parameter = await this.parameterService.findOneBySlug(typeParmaSlug);
      return res.send({ parameter });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: 'Server error' });
    }
  }

  // Créer un paramètre
  @Post()
  @ApiOperation({ summary: 'Créer un nouveau paramètre' })
  @ApiResponse({ status: 201, description: 'Paramètre créé avec succès.' })
  async create(
    @Body() createParameterDto: CreateParameterDto,
    @Res() res: Response,
  ) {
    try {
      const newParameter =
        await this.parameterService.create(createParameterDto);
      return res.status(201).send({ parameter: newParameter });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: 'Server error' });
    }
  }

  // Mettre à jour un paramètre
  @Put(':id')
  @ApiOperation({ summary: 'Mettre à jour un paramètre' })
  @ApiResponse({ status: 200, description: 'Paramètre mis à jour.' })
  async update(
    @Param('id') id: number,
    @Body() updateParameterDto: CreateParameterDto,
    @Res() res: Response,
  ) {
    try {
      const updatedParameter = await this.parameterService.update(
        id,
        updateParameterDto,
      );
      return res.send({ parameter: updatedParameter });
    } catch (error) {
      console.error(error);
      return res.status(404).send({ message: 'Paramètre non trouvé' });
    }
  }

  // Supprimer un paramètre
  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un paramètre' })
  @ApiResponse({ status: 200, description: 'Paramètre supprimé.' })
  async delete(@Param('id') id: number, @Res() res: Response) {
    try {
      await this.parameterService.remove(id);
      return res.send({ message: 'Paramètre supprimé avec succès' });
    } catch (error) {
      console.error(error);
      return res.status(404).send({ message: 'Paramètre non trouvé' });
    }
  }
}
