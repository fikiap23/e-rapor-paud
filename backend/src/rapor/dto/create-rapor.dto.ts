import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRaporDto {
    @IsOptional()
    @IsInt()
    totalSakit?: number;

    @IsOptional()
    @IsInt()
    totalIzin?: number;

    @IsOptional()
    @IsInt()
    totalAlpa?: number;

    @IsArray()
    @IsNotEmpty()
    catatanAgamaBudipekerti: string[];

    @IsArray()
    @IsNotEmpty()
    catatanJatiDiri: string[];

    @IsArray()
    @IsNotEmpty()
    catatanLiterasiSains: string[];

    @IsString()
    @IsNotEmpty()
    catatanPertumbuhan: string;

    @IsString()
    @IsNotEmpty()
    catatanPancasila: string;

    @IsString()
    @IsNotEmpty()
    catatanGuru: string;

    @IsString()
    @IsNotEmpty()
    idSemester: string;

    @IsString()
    @IsNotEmpty()
    idMurid: string;

    @IsString()
    @IsNotEmpty()
    idRombelSemesterGuru: string;
}
