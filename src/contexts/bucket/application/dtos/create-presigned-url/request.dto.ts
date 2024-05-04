import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePreSignedUrlRequestDTO {
  @ApiProperty({
    description: 'Identificador do arquivo',
    type: String,
    example: 'example.pdf',
  })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({
    description: 'Formato do arquivo',
    type: String,
    example: 'pdf',
  })
  @IsString()
  @IsNotEmpty()
  contentType!: string;
}
