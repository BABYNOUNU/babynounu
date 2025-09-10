import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  UsePipes,
  ValidationPipe,
  Put,
  Req,
} from '@nestjs/common';
import { PaymentService } from './paiement.service';
import { CreatePaymentDto } from './dtos/create-payment.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { UpdatePaymentDto } from './dtos/update-payment.dto';

@ApiTags('paiements') // Tag pour regrouper les endpoints dans Swagger UI
@Controller('paiements')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new payment' }) // Description de l'opération
  @ApiBody({ type: CreatePaymentDto }) // Documenter le corps de la requête
  @ApiResponse({
    status: 201,
    description: 'Payment created successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @UsePipes(new ValidationPipe())
  async createPayment(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.createPayment(createPaymentDto);
  }


  @Post('notify')
  async handleNotification(@Body() notificationData: any, @Req() req: Request) {
    // Log pour le débogage
    console.log('Notification reçue:', notificationData);
    
    try {
      const result = await this.paymentService.handlePaymentNotification(notificationData);
      
      // Mettez à jour votre base de données ici selon le statut
      console.log('Résultat du traitement:', result);
      
      return  result ;
    } catch (error) {
      console.error('Erreur de traitement:', error);
      return { status: 'ERROR', message: error.message };
    }
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get payments for a user' }) // Description de l'opération
  @ApiParam({ name: 'userId', type: Number, description: 'ID of the user' }) // Documenter le paramètre de route
  @ApiResponse({
    status: 200,
    description: 'Payments retrieved successfully',
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  async getPaymentsByUser(@Param('userId') userId: number) {
    return this.paymentService.getPaymentsByUser(userId);
  }


  @Get('user/:userId/transaction/:transactionId')
  @ApiOperation({ summary: 'Get a payment by user ID and transaction ID' }) // Description de l'opération
  @ApiParam({ name: 'userId', type: Number, description: 'ID of the user' }) // Documenter le paramètre de route
  @ApiParam({ name: 'transactionId', type: String, description: 'ID of the transaction' }) // Documenter le paramètre de route
  @ApiResponse({
    status: 200,
    description: 'Payment retrieved successfully',
  })
  @ApiResponse({ status: 404, description: 'Payment not found' })
  async getPaymentByUserIdAndTransactionId(
    @Param('userId') userId: string,
    @Param('transactionId') transactionId: string,
  ) {
    return this.paymentService.getPaymentByUserIdAndTransactionId(
      userId,
      transactionId,
    );
  }

  @Get(':paymentId')
  @ApiOperation({ summary: 'Get a payment by ID' }) // Description de l'opération
  @ApiParam({ name: 'paymentId', type: Number, description: 'ID of the payment' }) // Documenter le paramètre de route
  @ApiResponse({
    status: 200,
    description: 'Payment retrieved successfully',
  })
  @ApiResponse({ status: 404, description: 'Payment not found' })
  async getPaymentById(@Param('paymentId') paymentId: string) {
    return this.paymentService.getPaymentById(paymentId);
  }

  @Patch(':paymentId/status')
  @ApiOperation({ summary: 'Update payment status' }) // Description de l'opération
  @ApiParam({ name: 'paymentId', type: Number, description: 'ID of the payment' }) // Documenter le paramètre de route
  @ApiBody({ schema: { example: { status: 'completed' } } }) // Documenter le corps de la requête
  @ApiResponse({
    status: 200,
    description: 'Payment status updated successfully',
  })
  @ApiResponse({ status: 404, description: 'Payment not found' })
  async updatePaymentStatus(
    @Param('paymentId') paymentId: string,
    @Body('status') status: string,
  ) {
    return this.paymentService.updatePaymentStatus(paymentId, status);
  }


  @Put(':paymentId')
  @ApiOperation({ summary: 'Update a payment by ID' }) // Description de l'opération
  @ApiParam({ name: 'paymentId', type: Number, description: 'ID of the payment' }) // Documenter le paramètre de route
  @ApiBody({ schema: { example: { amount: 100.99, paymentMethod: 'CB' } } }) // Documenter le corps de la requête
  @ApiResponse({
    status: 200,
    description: 'Payment updated successfully',
  })
  @ApiResponse({ status: 404, description: 'Payment not found' })
  async updatePayment(
    @Param('paymentId') paymentId: string,
    @Body() updatePaymentDto: UpdatePaymentDto,
  ) {
    return this.paymentService.updatePayment(paymentId, updatePaymentDto);
  }
}

 
