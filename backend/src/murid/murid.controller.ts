import {
    Body,
    Controller,
    Get,
    Put,
    HttpStatus,
    Param,
    Post,
    Res,
    Delete,
    Query,
    UseGuards,
    UseInterceptors,
    UploadedFile,
} from '@nestjs/common';
import { JwtGuard, RoleGuard } from '../auth/guard';
import { Roles } from '../auth/decorator';
import { Role } from '@prisma/client';
import { MuridService } from './murid.service';
import CreateMuridDto from './dto/create-murid.dto';
import { HttpHelper } from '../helpers/http-helper';
import { UpdateMuridDto } from './dto/update-murid.dto';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller('murid')
export class MuridController {
    constructor(private readonly muridService: MuridService, private readonly httpHelper: HttpHelper) { }

    @Post()
    @UseGuards(JwtGuard, RoleGuard)
    @Roles(Role.ADMIN)
    @UseInterceptors(FileInterceptor('foto'))
    async create(@Body() dto: CreateMuridDto, @Res() res, @UploadedFile() file: Express.Multer.File) {
        const result = await this.muridService.create(dto, file);
        return this.httpHelper.formatResponse(res, HttpStatus.CREATED, result);
    }

    @Put(':id')
    @UseGuards(JwtGuard, RoleGuard)
    @Roles(Role.ADMIN)
    @UseInterceptors(FileInterceptor('foto'))
    async update(@Body() dto: UpdateMuridDto, @Res() res, @Param('id') id, @UploadedFile() file: Express.Multer.File) {
        await this.muridService.updateById(id, dto, file);
        return this.httpHelper.formatResponse(res, HttpStatus.OK, {});
    }

    @Delete(':id')
    @UseGuards(JwtGuard, RoleGuard)
    @Roles(Role.ADMIN)
    async delete(@Res() res, @Param('id') id) {
        await this.muridService.deleteById(id);
        return this.httpHelper.formatResponse(res, HttpStatus.OK, {});
    }

    @Get()
    async findAll(@Res() res) {
        const result = await this.muridService.findAll();
        return this.httpHelper.formatResponse(res, HttpStatus.OK, result);
    }

    @Get('null-rombel')
    async findByNullRombel(@Res() res) {
        const result = await this.muridService.findByNullRombel()
        return this.httpHelper.formatResponse(res, HttpStatus.OK, result);
    }

    @Get(':id')
    async findOne(@Res() res, @Param('id') id) {
        const result = await this.muridService.findOne(id);
        return this.httpHelper.formatResponse(res, HttpStatus.OK, result);
    }
}