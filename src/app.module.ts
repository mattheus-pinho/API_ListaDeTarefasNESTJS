import { TarefaModule } from './tarefa/tarefa.module';
import { UsuarioModule } from './usuario/usuario.module';
import { UsuarioController } from './usuario/usuario.controller';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioService } from './usuario/usuario.service';
import { usuarioEntity } from './usuario/interfaces/usuario.entity';

@Module({
  imports: [
    TarefaModule,
    UsuarioModule,
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local', '.env.development']
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      password: process.env.DB_PASSWORD,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      synchronize: true,
      entities: [`${__dirname}/**/*.entity{.js,.ts}`],
    }),
    UsuarioModule,
    TarefaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }