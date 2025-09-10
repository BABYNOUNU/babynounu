import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { Roles } from './models/role.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Roles
    ])
  ],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService, TypeOrmModule]
})
export class RoleModule {}
