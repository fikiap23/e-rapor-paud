import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MomentModule } from '@ccmos/nestjs-moment';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module';
import { HelperModule } from '../helpers/helper.module';
import { NilaiMingguanController } from './nilai-mingguan.controller';
import { NilaiMingguanService } from './nilai-mingguan.service';
import { NilaiMingguanRepository } from './nilai-mingguan.repository';
import { NilaiMingguanQuery } from '../prisma/queries/nilai-mingguan/nilai-mingguan.query';
import { ModulAjarModule } from '../modul-ajar/modul-ajar.module';
import { AuthModule } from '../auth/auth.module';
import { MuridModule } from '../murid/murid.module';
import { RombelModule } from '../rombel/rombel.module';
import { CpTpModule } from '../cp-tp/cp-tp.module';


@Module({
    imports: [
        PrismaModule,
        JwtModule.register({}),
        MomentModule,
        ConfigModule,
        HelperModule,
        AuthModule,
        ModulAjarModule,
        MuridModule,
        RombelModule,
        CpTpModule
    ],
    providers: [NilaiMingguanService, NilaiMingguanRepository, NilaiMingguanQuery],
    controllers: [NilaiMingguanController],
    exports: [NilaiMingguanService, NilaiMingguanRepository],
})
export class NilaiMingguanModule { }