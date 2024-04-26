import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, IsUrl } from 'class-validator';

export class CreatePreSignedUrlResponseDTO {
  @ApiProperty({
    description: 'URL para upload do arquivo',
    type: String,
    example: 'www.example.com/dcebb2ee-03d2-46da-94db-ff9f16e83e37',
  })
  @IsString()
  @IsUrl()
  signedUrl!: string;

  @ApiProperty({
    description: 'Identificador do arquivo na base de dados',
    type: String,
    example: 'dcebb2ee-03d2-46da-94db-ff9f16e83e37',
  })
  @IsString()
  @IsUUID()
  id!: string;
}
