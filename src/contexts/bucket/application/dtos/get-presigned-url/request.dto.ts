import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class GetPreSignedUrlRequestDTO {
  @ApiProperty({
    description: 'Identificador do arquivo',
    type: String,
    example: 'dcebb2ee-03d2-46da-94db-ff9f16e83e37',
  })
  @IsString()
  @IsUUID()
  id!: string;
}
