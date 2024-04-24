import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Usuarios, UsuariosSchema } from './entities/usuarios.entity';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports:
    [
      MongooseModule.forFeature([
        {
          name: Usuarios.name,
          schema: UsuariosSchema
        },
      ])
    ],
})
export class AuthModule { }
