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
import BulkMuridDto from './dto/bulk-muri.dto';
import GetMuridWithNilaiDto from './dto/get-murid-with-nilai.dto';


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

    @Post('bulk')
    @UseGuards(JwtGuard, RoleGuard)
    @Roles(Role.ADMIN)
    async createMany(@Body() dto: BulkMuridDto[], @Res() res) {
        const result = await this.muridService.createMany(dto);
        return this.httpHelper.formatResponse(res, HttpStatus.CREATED, result);
    }

    @Put('clear-rombel/:id')
    @UseGuards(JwtGuard, RoleGuard)
    @Roles(Role.ADMIN)
    async removeRombelById(@Res() res, @Param('id') id) {
        await this.muridService.removeRombelById(id);
        return this.httpHelper.formatResponse(res, HttpStatus.OK, {});
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

    @Get('with-nilai')
    async findOneStudentByIdRombelSemesterGuruAndIdMurid(@Res() res, @Query() dto: GetMuridWithNilaiDto) {
        const result = await this.muridService.findOneStudentByIdRombelSemesterGuruAndIdMurid(dto.idRombelSemesterGuru, dto.idMurid);
        return this.httpHelper.formatResponse(res, HttpStatus.OK, result);
    }

    @Get('rombel-semester-guru/:id')
    async findOneStudentByIdRombel(@Res() res, @Param('id') id) {
        const result = await this.muridService.getStudentsSemesterRombelByIdRombelSemesterGuru(id);
        return this.httpHelper.formatResponse(res, HttpStatus.OK, result);
    }

    @Get('rombel-semester-guru/many/:id')
    async findManyStudentByIdRombel(@Res() res, @Param('id') id) {
        const result = await this.muridService.findManyStudentByIdRombelSemesterGuru(id);
        return this.httpHelper.formatResponse(res, HttpStatus.OK, result);
    }

    @Get('rombel-semester-guru/arsip/:id')
    async findStaticRaporAndAnalisisNilaiByIdRombelSemesterGuru(@Res() res, @Param('id') id) {
        const result = await this.muridService.findStaticRaporAndAnalisisNilaiByIdRombelSemesterGuru(id);
        return this.httpHelper.formatResponse(res, HttpStatus.OK, result);
    }

    @Get(':id')
    async findOne(@Res() res, @Param('id') id) {
        const result = await this.muridService.findOne(id);
        return this.httpHelper.formatResponse(res, HttpStatus.OK, result);
    }

}