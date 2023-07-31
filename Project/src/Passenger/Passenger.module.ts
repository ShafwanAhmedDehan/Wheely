import { Module } from "@nestjs/common";
import { PassengerController } from "./Passenger.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import { PassengerService } from "./Passenger.service";
import {PassengerEntity} from "./PassengerEntity/Passenger.entity";
import { EmergencyContactEntity } from "./PassengerEntity/Passenger.SOScontact";
import { ProfilePicEntity } from "./PassengerEntity/Passenger.Profilepic";
import { PassangerPaymentHistory } from "./PassengerEntity/Passenger.PaymentHistory";
import { StudentProfile } from "./PassengerEntity/Passenger.StudentInfo";


@Module({
    imports : [ TypeOrmModule.forFeature([PassengerEntity,StudentProfile, EmergencyContactEntity, ProfilePicEntity, PassangerPaymentHistory])],
    controllers : [ PassengerController ],
    providers : [ PassengerService ],
})

export class PassengerModule{};