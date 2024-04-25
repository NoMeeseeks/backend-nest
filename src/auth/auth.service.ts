import { Injectable } from '@nestjs/common';
import { CrearUsuarioDto } from './dto/crear-usuario.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Usuarios } from './entities/usuarios.entity';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel(Usuarios.name)
    private usuariosModel: Model<Usuarios>,
  ) {

  }

  create(crearUsuarioDto: CrearUsuarioDto) {
    const nuevoUsuario = new this.usuariosModel(crearUsuarioDto);
    return nuevoUsuario.save();
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
