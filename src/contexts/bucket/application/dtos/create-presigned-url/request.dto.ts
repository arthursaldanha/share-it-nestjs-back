import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches } from 'class-validator';

export class CreatePreSignedUrlRequestDTO {
  @ApiProperty({
    description: 'Identificador do arquivo',
    type: String,
    example: 'example.pdf',
  })
  @IsString()
  name!: string;

  @ApiProperty({
    description: 'Formato do arquivo',
    type: String,
    example: 'application/pdf',
  })
  @IsString()
  @Matches(/\w+\/[-+.\w]+/, {
    message: 'O formato do arquivo deve seguir o padrão MIME (RFC 6838).',
  })
  contentType!: string;
}
