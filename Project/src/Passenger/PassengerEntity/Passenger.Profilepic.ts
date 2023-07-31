import {Column, Entity,JoinColumn,OneToOne,PrimaryGeneratedColumn} from 'typeorm'
import { PassengerEntity } from './Passenger.entity';

@Entity("ProfilePicturePassenger")
export class ProfilePicEntity
{
    @PrimaryGeneratedColumn()
    id:number;
    @Column({name: 'FileName', type: 'varchar'})
    ppfilename:string;

    @OneToOne(() => PassengerEntity, pinfo => pinfo.SOS,{cascade: true})
    @JoinColumn()
    pinfo : number;
}