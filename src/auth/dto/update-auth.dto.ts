import { PartialType } from '@nestjs/mapped-types';
import { CrearUsuarioDto } from './crear-usuario.dto';

export class UpdateAuthDto extends PartialType(CrearUsuarioDto) { }
