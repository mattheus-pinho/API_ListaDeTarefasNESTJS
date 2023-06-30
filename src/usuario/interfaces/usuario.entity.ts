import { timeStamp } from 'console';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class usuarioEntity{

    @PrimaryGeneratedColumn()
    id: Number;

    @Column({length: 100, nullable: false})
    nome: String;

    @Column({length: 150, nullable: false})
    email: String;

    @Column({length: 200, nullable: false})
    senha: String;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' , nullable: false})
    created_at: Date;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' , nullable: false})
    updated_at: Date;

}