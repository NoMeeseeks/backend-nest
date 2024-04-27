import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CrearUsuarioDto } from './dto/crear-usuario.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginDto } from './dto/login-usuario.dto';
import { AuthGuard } from './guards/auth.guard';
import { LoginResponse } from './interfaces/login-response';
import { Usuarios } from './entities/usuarios.entity';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post()
  create(@Body() crearUsuarioDto: CrearUsuarioDto) {
    return this.authService.crearUsuario(crearUsuarioDto);
  }

  @Post('/iniciarSesion')
  login(@Body() loginUsuario: LoginDto) {
    return this.authService.iniciarSesion(loginUsuario);
  }

  @Post('/registrarse')
  registrarse(@Body() crearUsuarioDto: CrearUsuarioDto) {
    return this.authService.registrarse(crearUsuarioDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Request() req: Request) {
    // console.log(req);
    // const usuario = req['usuario'];
    // return usuario;
    return this.authService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get('/renovarToken')
  validarToken(@Request() req: Request): LoginResponse {
    const usuario = req['usuario'] as Usuarios;
    return {
      usuario,
      token: this.authService.getJwt({ id: usuario._id })
    }
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authService.remove(+id);
  // }
}
