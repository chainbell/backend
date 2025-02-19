/* eslint-disable prettier/prettier */


import { applyDecorators } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { CreateEncyclopediaDto } from 'src/application/encyclopedia/dto/req/CreateEncyclopediaDto';

export function FileUploadBody() {
    return applyDecorators(
        ApiBody({
            description: 'Create Encyclopedia',
            type: 'object',
            required: true,
            schema: {
                type: 'object',
                properties: {
                    file: {
                        type: 'string',
                        format: 'binary',
                        description: '업로드할 파일',
                    },
                },
            },
        }),
    );
}
