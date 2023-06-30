import { TarefaService } from './tarefa.service';
import { TarefaController } from './tarefa.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [
        TarefaController,],
    providers: [
        TarefaService,],
})
export class TarefaModule { }
