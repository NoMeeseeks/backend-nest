import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    //modulo de variables de entorno
    ConfigModule.forRoot(),

    //modulo para usar mongo db
    MongooseModule.forRoot(process.env.MONGO_URI),
    // MongooseModule.forRoot('mongodb://localhost:27017'),

    //modulo de authenticacion

    AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {

}
