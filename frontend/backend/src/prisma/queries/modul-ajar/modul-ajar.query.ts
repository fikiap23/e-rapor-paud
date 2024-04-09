import { BadRequestException, Injectable } from '@nestjs/common';
import { DbService } from '../../db.service';
import CreateModulAjarDto from '../../../modul-ajar/dto/create-modul-ajar.dto';
import { UpdateModulAjarDto } from '../../../modul-ajar/dto/update-modul-ajar.dto';

@Injectable()
export class ModulAjarQuery extends DbService {
    async findAll() {
        return await this.prisma.modulAjar.findMany()
    }

    async findById(id: string) {
        return await this.prisma.modulAjar.findUnique({ where: { id } })
    }

    async findByIdAndRombel(id: string, idRombel: string) {
        return await this.prisma.modulAjar.findUnique({ where: { id, idRombel } })
    }

    async findByIdRombel(idRombel: string) {
        const modulAjar = await this.prisma.modulAjar.findMany({ where: { idRombel }, include: { tujuanPembelajaran: true }, orderBy: { minggu: 'asc' } })
        return modulAjar
    }

    async checkIsMingguHasUsed(minggu: number, idTujuanPembelajaran: string, idRombel: string): Promise<boolean> {
        const isMingguHasUsed = await this.prisma.modulAjar.findFirst({ where: { minggu, idTujuanPembelajaran, idRombel } })
        return isMingguHasUsed ? true : false
    }

    async create(idRombel: string, payload: CreateModulAjarDto) {
        return await this.prisma.modulAjar.create({ data: { ...payload, idRombel } })
    }

    async updateById(id: string, payload: UpdateModulAjarDto) {
        return await this.prisma.modulAjar.update({ where: { id }, data: payload })
    }

    async deleteById(id: string) {
        return await this.prisma.modulAjar.delete({ where: { id } })
    }
}