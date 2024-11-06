import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ParentService } from './parent.service';

@ApiTags('Parents')
@Controller('parent')
export class ParentController {

    constructor(private readonly parentService: ParentService){

    }

  // Get All Parents
  @Get('')
  GetParents() {
    this.parentService.Parents()
  }

  // Get Signle Parent
  @Get('/:id')
  GetParent() {
    this.parentService.Parents()
  }

  // Create new Parent
  @Post('create')
  CreateParent() {
    this.parentService.CreateParent()
  }

  // Update parent existing
  @Patch('update/:id')
  UpdateParent() {
    this.parentService.UpdateParent()
  }

  // Delete parent existing
  @Delete('/delete/:id')
  DeleteParent(@Param('id') id: number) {
    this.parentService.DeleteParent(id)
  }
}
