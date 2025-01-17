import { ApiProperty } from '@nestjs/swagger';

export class UpdateJobDto {
  @ApiProperty({ example: 'Senior Software Engineer', description: 'Updated title of the job', required: false })
  title?: string;

  @ApiProperty({ example: 'Develop and maintain complex software applications', description: 'Updated description of the job', required: false })
  description?: string;

  @ApiProperty({ example: 'San Francisco, USA', description: 'Updated location of the job', required: false })
  location?: string;

  @ApiProperty({ example: 100000, description: 'Updated salary offered for the job', required: false })
  salary?: number;
}