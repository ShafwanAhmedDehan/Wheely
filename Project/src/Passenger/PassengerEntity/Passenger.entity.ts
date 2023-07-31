import {Column, Entity,JoinColumn,OneToMany,OneToOne,PrimaryGeneratedColumn} from 'typeorm'
import { EmergencyContactEntity } from './Passenger.SOScontact';
import { ProfilePicEntity } from './Passenger.Profilepic';
import { PassangerPaymentHistory } from './Passenger.PaymentHistory';
import { StudentProfile } from './Passenger.StudentInfo';

@Entity("PassengerLogin")
export class PassengerEntity
{
    @PrimaryGeneratedColumn()
    id:number;
    @Column({name: 'Email', type: 'varchar',length: 100,unique: true})
    email:string;
    @Column({name: 'Phone', type: 'varchar',length: 20,unique: true})
    phone:string;
    @Column({name: 'Password', type: 'varchar',length: 100})
    password:string;
    @Column({name: 'FirstName', type: 'varchar', length:100})
    fname:string;
    @Column({name: 'LastName', type: 'varchar', length:100})
    lname:string;
    @Column({name: 'Gender', type: 'varchar', length:100})
    gender:string;
    @Column({name: 'NID', type: 'varchar', length:100})
    nid:string;
    @Column({name: 'Age', type: 'integer'})
    age:number;

    @OneToOne(() => EmergencyContactEntity, SOS => SOS.pinfo)
    SOS:number;
    @OneToOne(() => ProfilePicEntity, DP => DP.pinfo)
    DP:number;

    @OneToOne(() => StudentProfile, Sprof => Sprof.pinfo)
    Sprof: StudentProfile;

    @OneToMany(() => PassangerPaymentHistory, Ppayment => Ppayment.pinfo)
    pinfos: PassangerPaymentHistory[];
}