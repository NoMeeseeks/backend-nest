import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import * as request from 'supertest';
import { JwtPayload } from '../interfaces/jwt-payload';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private jwtService: JwtService,
    private authService: AuthService,
  ) {

  }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    // console.log(request);
    const token = this.extractTokenFromHeader(request);
    // console.log(token);

    if (!token) {
      throw new UnauthorizedException('No tiene un bearer token');
    }
    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(
        token, {
        secret: process.env.JWT_SEED
      });

      const usuario = await this.authService.buscarUsuarioPorId(payload.id);
      if (!usuario) { throw new UnauthorizedException('El usuario no existe') }
      if (!usuario.es_activo) { throw new UnauthorizedException('El usuario no esta activo') }

      request['usuario'] = usuario;

    } catch (error) {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type == 'Bearer' ? token : undefined;
  }
}
