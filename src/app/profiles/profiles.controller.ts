// src/profiles/profiles.controller.ts

import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Put,
    HttpStatus,
    Res,
 } from '@nestjs/common';
 import { ProfilesService } from './profiles.service';
 import { CreateProfileDto } from './dtos/create-profile.dto';
 import { UpdateProfileDto } from './dtos/update-profile.dto';
 import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
 
 @ApiTags('profiles')
 @Controller('profiles')
 export class ProfilesController {
    constructor(private readonly profilesService: ProfilesService) {}
 
    @Post()
    @ApiOperation({ summary: 'Create a profile' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Profile created successfully.' })
    async createProfile(@Body() createProfileDto: CreateProfileDto, @Res() res) {
       const profile = await this.profilesService.createProfile(createProfileDto);
       return res.status(HttpStatus.CREATED).json(profile);
    }
 
    @Put(':id')
    @ApiOperation({ summary: 'Update a profile' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Profile updated successfully.' })
    async updateProfile(@Param('id') id: number, @Body() updateProfileDto: UpdateProfileDto, @Res() res) {
       const profile = await this.profilesService.updateProfile(id, updateProfileDto);
       return res.status(HttpStatus.OK).json(profile);
    }
 
    @Get(':id')
    @ApiOperation({ summary: 'Get a profile by ID' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Profile retrieved successfully.' })
    async getProfileById(@Param('id') id: number, @Res() res) {
       const profile = await this.profilesService.getProfileById(id);
       return res.status(HttpStatus.OK).json(profile);
    }
 }