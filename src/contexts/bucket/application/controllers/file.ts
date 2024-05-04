import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';

import { ioc } from '@/contexts/shared/infra/ioc';
import { ErrorDto } from '@/contexts/shared/application/dtos/error.dto';

import {
  CreatePreSignedUrlRequestDTO,
  CreatePreSignedUrlResponseDTO,
  GetPreSignedUrlResponseDTO,
} from '@/contexts/bucket/application/dtos';
import {
  CreatePreSignedUrlService,
  GetPreSignedUrlService,
} from '@/contexts/bucket/application/services';

@ApiTags('Arquivos')
@ApiExtraModels(ErrorDto)
@ApiResponse({
  status: '4XX',
  schema: { $ref: getSchemaPath(ErrorDto) },
})
@ApiResponse({
  status: '5XX',
  schema: { $ref: getSchemaPath(ErrorDto) },
})
@Controller({ path: '/uploads', version: '1' })
export class FilesController {
  constructor(
    @Inject(ioc.application.services.createPreSignedUrl)
    private readonly createPreSignedUrl: CreatePreSignedUrlService,
    @Inject(ioc.application.services.getPreSignedUrl)
    private readonly getPreSignedUrl: GetPreSignedUrlService,
  ) { }

  @ApiOperation({
    summary: 'Cria uma URL assinada para realizar o upload',
  })
  @ApiExtraModels(CreatePreSignedUrlResponseDTO)
  @ApiResponse({
    status: 201,
    schema: { $ref: getSchemaPath(CreatePreSignedUrlResponseDTO) },
  })
  @Post()
  async create(@Body() body: CreatePreSignedUrlRequestDTO) {
    return await this.createPreSignedUrl.execute(body);
  }

  @ApiOperation({
    summary: 'Retorna uma URL assinada para acessar o arquivo',
  })
  @ApiExtraModels(GetPreSignedUrlResponseDTO)
  @ApiResponse({
    status: 200,
    schema: { $ref: getSchemaPath(GetPreSignedUrlResponseDTO) },
  })
  @Get(':fileId')
  async get(@Param('fileId') id: string) {
    return await this.getPreSignedUrl.execute(id);
  }
}
