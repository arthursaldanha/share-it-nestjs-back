import { ApiProperty } from '@nestjs/swagger';

export class ErrorDto {
  @ApiProperty({ example: '10000' })
  code!: string;

  @ApiProperty({ example: 'Algo deu errado.' })
  message!: string;
}
