import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { CreateContractDto } from './dtos/create-contracts.dto';
import { UpdateContractDto } from './dtos/update-contracts.dto';
import { Contracts } from './models/contracts.model';

@Controller('contracts')
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {}

  @Post('create')
  create(@Body() createContractDto: CreateContractDto): Promise<Contracts> {
    return this.contractsService.create(createContractDto);
  }

  @Get()
  findAll(): Promise<Contracts[]> {
    return this.contractsService.findAll();
  }

  @Get('user/:userId')
  findAllByUserId(
    @Param('userId', ParseIntPipe) userId: string,
  ): Promise<Contracts[]> {
    return this.contractsService.findAllByUserId(userId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Contracts> {
    return this.contractsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateContractDto: UpdateContractDto,
  ): Promise<Contracts> {
    return this.contractsService.update(id, updateContractDto);
  }

  
  @Patch(':id/status')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status') status: 'Accepted' | 'Pending' | 'Canceled',
  ): Promise<Contracts> {
    return this.contractsService.updateStatus(id, status);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.contractsService.remove(id);
  }

  @Post(':id/restore')
  restore(@Param('id', ParseIntPipe) id: number): Promise<Contracts> {
    return this.contractsService.restore(id);
  }
}
