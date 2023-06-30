import { UsuarioService } from './usuario.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { usuarioEntity } from './interfaces/usuario.entity';

@Module({
    imports: [TypeOrmModule.forFeature([usuarioEntity])],
    controllers: [UsuarioController,],
    providers: [ UsuarioService,],
})
export class UsuarioModule { }
