import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!, Mi primer back en nest js';
  }

  getName(name: string): string {
    return `Hola como estas? ${name}`
  }
}
