import { BadRequestException, Injectable } from '@nestjs/common';
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

  async create(crearUsuarioDto: CrearUsuarioDto) {
    try {
      const nuevoUsuario = new this.usuariosModel(crearUsuarioDto);
      return await nuevoUsuario.save();
      //paso 1 encriptar la contra
      //paso 2 guardar el usuario
      //paso 3 generar el json web token
      //paso 4 manejar las excepciones




    } catch (error) {
      console.log(error.code);
      if (error.code === 11000) {
        throw new BadRequestException(`${crearUsuarioDto.correo} ya existe`)
      }
      throw new BadRequestException(`upps esto no debio pasar`)
    }

    // const nuevoUsuario = new this.usuariosModel(crearUsuarioDto);
    // return nuevoUsuario.save();
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
