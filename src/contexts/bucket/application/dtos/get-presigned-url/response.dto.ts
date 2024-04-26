import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl } from 'class-validator';

export class GetPreSignedUrlResponseDTO {
  @ApiProperty({
    description: 'URL para upload do arquivo',
    type: String,
    example: 'www.example.com/dcebb2ee-03d2-46da-94db-ff9f16e83e37',
  })
  @IsString()
  @IsUrl()
  signedUrl!: string;
}
