import { Injectable } from '@nestjs/common';
import { usuarioDto } from './dtos/usuario.dto';
import { autenticarUsuario } from './dtos/autenticarUsuario.dto';
import { usuarioEntity } from './interfaces/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import * as bcryptjs from "bcryptjs";

@Injectable()
export class UsuarioService {
    
    private usuarios: usuarioEntity[];
    private saltOrRounds = 10;
    private salt = bcryptjs.genSaltSync(this.saltOrRounds);

    constructor(
        @InjectRepository(usuarioEntity)
        private readonly usuarioRepository: Repository<usuarioEntity>,
    ) {}

    async criarUsuario(usuarioDto: usuarioDto): Promise<usuarioEntity> {

        const stamp = new Date().toISOString();
        const senhaHash = await bcryptjs.hash(usuarioDto.senha, this.salt);
        const email = usuarioDto.email;
       

        

        return this.usuarioRepository.save({
            ...usuarioDto,
            senha: senhaHash,
            created_at: stamp,
            updated_at: stamp
        })
    }

    //Acrecentar codigos de erro personalizados para api
    async autenticarUsuario(email, senha){
        
        const usuario = await this.usuarioRepository.findOne({where:{email}});
        if(!usuario){
            return ("Usuário invalido")
        }if(usuario){   

            const comparacao = await bcryptjs.compare(senha, usuario.senha);
            if(comparacao){
            const usuarioAprovado = { "id" : usuario.id,"nome": usuario.nome, "email": usuario.email}
            return usuarioAprovado;
            }else{

                return ("senha invalida");
    
            }
     
        }

    }

    async deletarUsuario(id): Promise <any>{

        const idParsed = id.id;
        const usuarioExiste = await this.buscarUsuarioPorId(id);

        if(usuarioExiste !== "Usuario Invalido"){
            const del = await this.usuarioRepository.delete(idParsed);
            return ("Usuario de ID:" + idParsed + " foi deletado");
        }else{
            return("Usuario não existe")
        }
         
    }

    async getAllUsers(): Promise<usuarioEntity[]> {
        return this.usuarioRepository.find();
    }

    async buscarUsuarioPorId(ide){
        
        const idParsed = ide.id;
        const usuario = await this.usuarioRepository.findOneBy({id: Equal(idParsed)});
        if(usuario){
            return {"id" : usuario.id, "nome" : usuario.nome, "email" : usuario.email, "created_at" : usuario.created_at}
        }else{
            return ("Usuario Invalido")
        }
    }

    async buscarUsuarioPorEmail(email){
        
        const varEmail = email.email;
        const usuario = await this.usuarioRepository.findOneBy({email: varEmail});
        if(usuario){
            return {"id" : usuario.id, "nome" : usuario.nome, "email" : usuario.email, "created_at" : usuario.created_at}
        }else{
            return ("Email Invalido")
        }
    }

    async alterarUsuario(){
        return
    }
}
