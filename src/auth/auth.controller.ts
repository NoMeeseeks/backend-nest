import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CrearUsuarioDto } from './dto/crear-usuario.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginDto } from './dto/login-usuario.dto';

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
    return this.authService.iniciarSesion(crearUsuarioDto);
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
