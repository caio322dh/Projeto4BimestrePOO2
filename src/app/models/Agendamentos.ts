import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

import Usuarios from './Usuarios';

@Entity('agendamentos')
class Agendamentos {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    prestador_servico_id: string;

    @ManyToOne(() => Usuarios)
    @JoinColumn ({ name: 'prestador_servico_id' })
    prestador_servico: Usuarios;

    @Column('timestamp with time zone')
    data: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    update_at: Date;
}

export default Agendamentos;
