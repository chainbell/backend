/* eslint-disable prettier/prettier */

import { Body, Controller, Get, Post, Req, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBody, ApiConsumes, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateEncyclopediaDto } from "./dto/req/CreateEncyclopediaDto";
import { FileUploadBody } from "../credit/dto/req/CreateEncyclopediaBody";
import { FastifyRequest } from "fastify";

import * as fs from 'fs';
import * as path from 'path';


@ApiTags('Encyclopedia API - 백과사전 API')
@Controller('/api/v1/encyclopedia')
export class EncyclopediaController {

    @Get('')
    @ApiResponse({ status: 200, description: '백과사전 인기 급상승 조회', type: Map })
    async get(): Promise<Map<string, string>> {

        return null;

    }

    @Post('')
    @ApiConsumes('multipart/form-data')
    @FileUploadBody()
    @ApiResponse({ status: 200, description: '파일 업로드', type: Boolean })
    async post(
        @Req() req: FastifyRequest,
    ): Promise<boolean> {

        const data = await req.file(); // Fastify에서 파일 받기

        if (!data) {
            throw new Error('파일을 찾을 수 없습니다.');
        }

        // 저장할 파일 경로 설정
        const uploadPath = path.join('/app/', 'uploads', data.filename);

        // 파일 저장 (Buffer 기반)
        const buffer = await data.toBuffer();
        fs.writeFileSync(uploadPath, buffer);


        return true;
    }

}