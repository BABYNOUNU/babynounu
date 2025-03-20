import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateChatMessageDto {
 
    @ApiProperty({example: '000-000-000', description: 'The sender of the message'})
    @IsString()
    readonly senderId: string;

    @ApiProperty({example: '1234567890', description: 'The room ID of the message'})
    @IsString()
    readonly roomId: string;

    @ApiProperty({example: 'Hello, world!', description: 'The content of the message'})
    @IsString()
    @MinLength(1)
    readonly content: string;
    

}
