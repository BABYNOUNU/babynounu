import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    UsePipes,
    ValidationPipe,
    UseGuards,
  } from '@nestjs/common';
  import { AbonnementService } from './abonnement.service';
  import { CreateAbonnementDto } from './dtos/create-abonnement.dto';
  import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBody,
    ApiParam,
  } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/auh.guard';
  
  @ApiTags('abonnements') // Tag pour regrouper les endpoints dans Swagger UI
  @Controller('abonnements')
  export class AbonnementController {
    constructor(private readonly abonnementService: AbonnementService) {}
  
    @Post('comfirm')
    @ApiOperation({ summary: 'Create a new subscription' }) // Description de l'opération
    @ApiBody({ type: CreateAbonnementDto }) // Documenter le corps de la requête
    @ApiResponse({
      status: 201,
      description: 'Subscription created successfully',
    })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @UsePipes(new ValidationPipe())
    async createAbonnement(@Body() createAbonnementDto: CreateAbonnementDto) {
      return this.abonnementService.createAbonnement(createAbonnementDto);
    }
  
    @Get(':abonnementId')
    @ApiOperation({ summary: 'Get a subscription by ID' }) // Description de l'opération
    @ApiParam({ name: 'abonnementId', type: String, description: 'ID of the subscription' }) // Documenter le paramètre de route
    @ApiResponse({
      status: 200,
      description: 'Subscription retrieved successfully',
    })
    @ApiResponse({ status: 404, description: 'Subscription not found' })
    async getAbonnementById(@Param('abonnementId') abonnementId: string) {
      return this.abonnementService.getAbonnementById(abonnementId);
    }

    
    @Get('user/:userId')
    @ApiOperation({ summary: 'Get a subscription for a user' }) // Description de l'opération
    @ApiParam({ name: 'userId', type: String, description: 'ID of the user' }) // Documenter le paramètre de route
    @ApiResponse({
      status: 200,
      description: 'Subscription retrieved successfully',
    })
    @ApiResponse({ status: 404, description: 'User not found' })
    async getAbonnementByUserId(@Param('userId') userId: string) {
      return this.abonnementService.getAbonnementByUserId(userId);
    }
  
  

    @Get('user/has-active-subscription/:userId')
    @ApiOperation({ summary: 'Check if user has an active subscription' }) // Description de l'opération
    @ApiParam({ name: 'userId', type: String, description: 'ID of the user' }) // Documenter le paramètre de route
    @ApiResponse({
      status: 200,
      description: 'Returns true if user has an active subscription, otherwise false',
      schema: { example: { hasActiveSubscription: true } },
    })
    @ApiResponse({ status: 404, description: 'User not found' })
    async hasActiveAbonnement(@Param('userId') userId: string): Promise<{ hasActiveSubscription: boolean }> {
      const hasActiveSubscription = await this.abonnementService.hasActiveAbonnement(userId);
      return { hasActiveSubscription };
    }

  
    @Post('cancel/:abonnementId')
    @ApiOperation({ summary: 'Cancel a subscription' }) // Description de l'opération
    @ApiParam({ name: 'abonnementId', type: String, description: 'ID of the subscription' }) // Documenter le paramètre de route
    @ApiResponse({
      status: 200,
      description: 'Subscription canceled successfully',
    })
    @ApiResponse({ status: 404, description: 'Subscription not found' })
    async cancelAbonnement(@Param('abonnementId') abonnementId: string) {
      return this.abonnementService.cancelAbonnement(abonnementId);
    }
  }