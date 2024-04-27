import { BadRequestException, Injectable } from '@nestjs/common';
import { CrearUsuarioDto } from './dto/crear-usuario.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Usuarios } from './entities/usuarios.entity';
import { Model } from 'mongoose';
import * as bcryptjs from 'bcryptjs'
import { LoginDto } from './dto/login-usuario.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload';
import { LoginResponse } from './interfaces/login-response';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel(Usuarios.name)
    private usuariosModel: Model<Usuarios>,

    private jwtService: JwtService,
  ) {

  }

  async crearUsuario(crearUsuarioDto: CrearUsuarioDto): Promise<Usuarios> {
    try {
      //desectructuramos el objeto
      const { contrasena, ...usuarioData } = crearUsuarioDto;

      //paso 1 encriptar la contra
      const nuevoUsuario = new this.usuariosModel({
        contrasena: bcryptjs.hashSync(contrasena, 10),
        ...usuarioData
      });
      //paso 2 guardar el usuario y creamos una forma para no devolver la contra encriptada
      await nuevoUsuario.save();
      const { contrasena: _, ...Usuario } = nuevoUsuario.toJSON();
      return Usuario;
      //paso 3 manejar las excepciones
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

  async iniciarSesion(loginDto: LoginDto): Promise<LoginResponse> {
    /**
     * Debe regresar:
     * Usuario
     * Token
    */

    //desectruturamos
    const { correo, contrasena } = loginDto;

    //obtenemos el valor del correo
    const usuario = await this.usuariosModel.findOne({ correo })
    //validacion del correo
    if (!usuario) {
      throw new BadRequestException(`La credencial del correo no es valida`)
    }

    //validacion de la contrasena
    if (!bcryptjs.compareSync(contrasena, usuario.contrasena)) {
      throw new BadRequestException(`La credencial de la contraseña no es valida`)
    }

    //desectruturamos para no devolver la contrasena
    const { contrasena: _, ...rest } = usuario.toJSON();

    return {
      usuario: rest,
      token: this.getJwt({ id: usuario.id })
    };
  }

  async registrarse(registro: CrearUsuarioDto): Promise<LoginResponse> {
    const registrarUsuario = await this.crearUsuario(registro)
    return {
      usuario: registrarUsuario,
      token: this.getJwt({ id: registrarUsuario._id }),
    }
  }

  findAll(): Promise<Usuarios[]> {
    return this.usuariosModel.find();
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

  getJwt(payload: JwtPayload) {
    //generar el json web token
    const token = this.jwtService.sign(payload)
    return token;
  }
}
