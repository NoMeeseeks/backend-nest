import { IsEmail, IsString, MinLength } from "class-validator";

export class CrearUsuarioDto {

    @IsString()
    nombre: string;

    @IsEmail()
    correo: string;

    @MinLength(8)
    contrasena: string;
}
