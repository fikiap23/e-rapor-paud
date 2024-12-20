import { ModelPembelajaranType } from '@prisma/client';
import { IsInt, IsString, IsArray, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';

class CreateModulAjarDto {
    @IsNotEmpty()
    @IsInt()
    minggu: number;

    @IsNotEmpty()
    @IsString()
    topik: string;

    @IsNotEmpty()
    @IsString()
    subtopik: string;

    @IsOptional()
    @IsArray()
    katakunci: string[];

    @IsNotEmpty()
    @IsArray()
    tujuanKegiatan: string[];

    @IsOptional()
    @IsArray()
    alatBahan: string[];

    @IsOptional()
    @IsArray()
    petaKonsep: string[];

    @IsOptional()
    @IsString()
    alokasiWaktu?: string;

    @IsOptional()
    @IsString()
    deskripsiUmum?: string;

    @IsOptional()
    @IsEnum(ModelPembelajaranType)
    modelPembelajaran: ModelPembelajaranType;

    @IsOptional()
    @IsString()
    sumber?: string;

    @IsOptional()
    @IsString()
    curahIdeKegiatan?: string;

    @IsOptional()
    @IsString()
    kegiatanPembukaan?: string;

    @IsOptional()
    @IsString()
    istirahat?: string;

    @IsOptional()
    @IsString()
    kegiatanPenutupan?: string;

    @IsNotEmpty()
    @IsString()
    idTujuanPembelajaran: string;

    @IsNotEmpty()
    @IsString()
    idRombelSemesterGuru: string;
}

export default CreateModulAjarDto;
