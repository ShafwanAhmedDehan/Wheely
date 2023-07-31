import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PassengerEntity } from "./Passenger.entity";



@Entity("PaymentHistory")
export class PassangerPaymentHistory
{
    @PrimaryGeneratedColumn()
    id: number;
    @Column({name: 'Start', type: 'varchar',length: 100,unique: false})
    startPoint:string;
    @Column({name: 'Destination', type: 'varchar',length: 100,unique: false})
    destinationPoint:string;
    @Column({name: 'Payment', type: 'integer'})
    payment:number;
    @Column({name: 'Phone', type: 'varchar',length: 100,unique: false})
    phone:string;

    @ManyToOne(() => PassengerEntity, pinfo => pinfo.pinfos)
    pinfo: PassengerEntity;
}