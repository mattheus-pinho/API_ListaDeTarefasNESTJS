import { Controller, Post, Body, Get, Delete } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { usuarioDto } from './dtos/usuario.dto';
import { get } from 'http';
import { autenticarUsuario } from './dtos/autenticarUsuario.dto';
import { stringify } from 'querystring';



@Controller()
export class UsuarioController {

    constructor(private readonly UsuarioService: UsuarioService){}

    @Post('cadastrarusuario')
    cadastrarusuario(@Body() userData: any){ 
        return this.UsuarioService.criarUsuario(userData);
    }

    @Get('verTodosUsuarios')
    verTodosUsuarios(){
        return this.UsuarioService.getAllUsers();
    }

    @Get('usuarioPorId')
    usuarioPorId(@Body() id){
        return this.UsuarioService.buscarUsuarioPorId(id)
    }

    @Get('usuarioPorEmail')
    usuarioPorEmail(@Body() email){
        return this.UsuarioService.buscarUsuarioPorEmail(email)
    }

    @Post('autenticarUsuario')
    autenticarUsuario(@Body() autenticarUsuario: autenticarUsuario){
        
        return this.UsuarioService.autenticarUsuario(autenticarUsuario.email, autenticarUsuario.senha);
    }

    @Delete('deletarUsuario')
    deletarUsuario(@Body() id, email, senha){
        return this.UsuarioService.deletarUsuario(id)
    }
}
