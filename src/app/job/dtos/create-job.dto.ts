import { ApiProperty } from '@nestjs/swagger';

export class CreateJobDto {
  @ApiProperty({ example: 'Software Engineer', description: 'Title of the job' })
  title: string;

  @ApiProperty({ example: 'Develop and maintain software applications', description: 'Description of the job' })
  description: string;

  @ApiProperty({ example: 'New York, USA', description: 'Location of the job' })
  location: string;

  @ApiProperty({ example: 80000, description: 'Salary offered for the job' })
  salary: number;

  @ApiProperty({ example: 1, description: 'ID of the user posting the job' })
  userId: number;
}