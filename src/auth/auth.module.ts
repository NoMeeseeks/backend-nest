import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Usuarios, UsuariosSchema } from './entities/usuarios.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports:
    [
      //modulo de variables de entorno
      ConfigModule.forRoot(),

      MongooseModule.forFeature([
        {
          name: Usuarios.name,
          schema: UsuariosSchema
        },
      ]),
      JwtModule.register({
        global: true,
        secret: process.env.JWT_SEED,
        signOptions: { expiresIn: '6h' },
      }),
    ],
})
export class AuthModule { }
