import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PassengerEntity } from "./Passenger.entity";


@Entity("StudentProfile")

export class StudentProfile 
{
    @PrimaryGeneratedColumn()
    id: number;
    @Column({name: 'Institution', type: 'varchar',length: 100,unique: false})
    instname: string;
    @Column({name: 'StudentID', type: 'varchar',length: 100,unique: true})
    studentid: string;
    @Column({name: 'StudentName', type: 'varchar',length: 100,unique: false})
    level: string;

    @OneToOne(() => PassengerEntity, pinfo => pinfo.Sprof,{cascade: true})
    @JoinColumn()
    pinfo : PassengerEntity;
}
