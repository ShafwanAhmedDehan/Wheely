import {Column, Entity,JoinColumn,OneToOne,PrimaryGeneratedColumn} from 'typeorm'
import { PassengerEntity } from './Passenger.entity';

@Entity ("EmergencyContact")
export class EmergencyContactEntity
{
    @PrimaryGeneratedColumn()
    id:number;
    @Column({name: 'SOS Number', type: 'varchar',length: 100,unique: false})
    emrContact : string;

    @OneToOne(() => PassengerEntity, pinfo => pinfo.SOS,{cascade: true})
    @JoinColumn()
    pinfo : number; 
}