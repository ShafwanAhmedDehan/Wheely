import { Injectable, Session } from "@nestjs/common";
import { EmergencyContact, ForgetPassword, LoginPassenger, ProfilePhoto, SignUpPassenger, UpdateProfile, VehicleInfo, studentApplication } from "./Passenger.dto";
import { PassengerEntity } from "./PassengerEntity/Passenger.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { EmergencyContactEntity } from "./PassengerEntity/Passenger.SOScontact";
import { ProfilePicEntity } from "./PassengerEntity/Passenger.Profilepic";
import { randomBytes } from "crypto";
import { MailerService } from '@nestjs-modules/mailer/dist';
import * as bcrypt from 'bcrypt';
//import session from "express-session";
import session = require("express-session");
import { PassangerPaymentHistory } from "./PassengerEntity/Passenger.PaymentHistory";
import { StudentProfile } from "./PassengerEntity/Passenger.StudentInfo";
import { error } from "console";

@Injectable()
export class PassengerService
{
    constructor(
        @InjectRepository(PassengerEntity) private pLogin:Repository<PassengerEntity>,
        @InjectRepository(EmergencyContactEntity) private pSOS:Repository<EmergencyContactEntity>,
        @InjectRepository(ProfilePicEntity) private pDP:Repository<ProfilePicEntity>,
        @InjectRepository(PassangerPaymentHistory) private PsPayment:Repository<PassangerPaymentHistory>,
        @InjectRepository(StudentProfile) private Sinfo:Repository<StudentProfile>) {}

    async login(loginData : LoginPassenger, @Session() session)
    {
        const userInfo = await this.pLogin.findOneBy({email: loginData.emailphn});
        console.log(userInfo);
        if(userInfo === null)
        {
            const userInfo = await this.pLogin.findOneBy({phone: loginData.emailphn});
            if(userInfo === null)
            {
                let error = "Login failed check Your email/phone and password"
                return {error};
            }
            else
            {
                const check:boolean = await bcrypt.compare(loginData.password, userInfo.password);
                if(check === true)
                {
                    session.fname = userInfo.fname;
                    session.lname = userInfo.lname;
                    session.email = userInfo.email;
                    session.phone = userInfo.phone;
                    return {userInfo,session};   
                }
                else
                {
                    let error = "Login failed check Your email/phone and password"
                    return {error,session};
                }
            }
        }
        else
        {
            const check:boolean = await bcrypt.compare(loginData.password, userInfo.password);
            if(check === true)
            {
                session.fname = userInfo.fname;
                session.lname = userInfo.lname;
                session.email = userInfo.email;
                session.phone = userInfo.phone;
                return {userInfo,session};
            }
            else
            {
                let error = "Login failed check Your email/phone and password"
                return {error,session};
            }
        }
    }

    async SignUp(signUpData : SignUpPassenger) : Promise<object>
    {
        const salt = await bcrypt.genSalt();
        signUpData.password = await bcrypt.hash(signUpData.password, salt);
        return await this.pLogin.save(signUpData);
    }

    Forgetpassword(forgetpass : ForgetPassword) : string
    {
        let phone = forgetpass.phone;
        let newpass = forgetpass.newpassword;
        var notification2 = "Password Change Successfully......\nPhone No : "+phone+"\nNew Password : "+newpass;
        return notification2;
    }

    async StudentApplication(studentApp : studentApplication, @Session() session) : Promise<any>
    {
        const userInfo = await this.pLogin.findOneBy({phone: session.phone});
        if (userInfo === null)
        {
            throw new Error("User Not Found");
        }
        else
        {
            const studentapp = new StudentProfile(); 
            studentapp.studentid=studentApp.studentid;
            studentapp.instname = studentApp.instname;
            studentapp.level = studentApp.level;   
            studentapp.pinfo= userInfo;
            return this.Sinfo.save(studentapp);
        }
    }

    async viewProfile (phoneNo): Promise<any>
    {
        //console.log (phoneNo);
        const userInfo =await this.pLogin.findOneBy({phone: phoneNo.phnno});
        console.log(userInfo);
        const sosInfo = await this.pSOS.findOneBy({id: userInfo.id});
        return {userInfo, sosInfo};
    }

    SearchInfo (searchValue : VehicleInfo) : string
    {
        let vnum = "19393021";
        let name = "Dehan Ahmed";
        let ownphn = "0178155027";
        let notification4 = "Search Result........\nVehicle No : "+vnum+"\nOwner Name : "+name+"\nContact No : "+ownphn;
        return notification4;
    }

    async ProfileUpdate (newInfo: UpdateProfile) : Promise<any>
    {
        //console.log(PhoneNo.phonenoID);
        const value = await this.pLogin.findOneBy({phone:newInfo.phonenoID});
        console.log(value);
        if(value === null)
        {
            throw new Error("User Not Found");   
        }
        else
        {
            value.fname = newInfo.fname;
            value.lname = newInfo.lname;
            value.email = newInfo.email;
            value.phone = newInfo.phone;
            value.age = newInfo.age;
            await this.pLogin.save(value);
        }
        return this.pLogin.findOneBy({phone: newInfo.phone});
    }

    async AddEmergency (addemergency : EmergencyContact) : Promise<object>
    {
        return await this.pSOS.save(addemergency);
    }

    async UploadImage (fileobj : ProfilePhoto) : Promise<object>
    {
        return await this.pDP.save(fileobj);
    }

    ShowImage (pinfo : number) : Promise<object>
    {
        let value = this.pLogin.find({where : {id : pinfo},
            relations: ['DP']
        });
        return value;
    }

    OTPsend(phone: string) : any
    {
        const Buffer = randomBytes(2);
        const otpCode = Buffer.readUInt16BE(0) % 10000;
        const message = "Your OTP code is: " + otpCode + '. Don not share your OTP CODE';
        const axios = require('axios'); 
        const greenwebsms = new URLSearchParams(); 
        greenwebsms.append('token', '83860104231689534263b0bb9f257e9b1ab2465ee8e2c381d135'); 
        greenwebsms.append('to', phone); 
        greenwebsms.append('message', message); 
        axios.post('http://api.greenweb.com.bd/api.php', greenwebsms).then(response => { console.log(response.data); });
        return {otpCode};
    }

    async SendSOS (id) : Promise<any>
    {
        const userInfo =await this.pSOS.findOneBy({id: id.userid});
        userInfo.emrContact
        const message = "Your Known Person Send SOS Request. Check Contact Info";
        const axios = require('axios'); 
        const greenwebsms = new URLSearchParams(); 
        greenwebsms.append('token', '83860104231689534263b0bb9f257e9b1ab2465ee8e2c381d135'); 
        greenwebsms.append('to', userInfo.emrContact); 
        greenwebsms.append('message', message); 
        axios.post('http://api.greenweb.com.bd/api.php', greenwebsms).then(response => { console.log(response.data); });
        return userInfo.emrContact;
    }

    showPaymentHistory (id: number) : any 
    {
        return this.pLogin.find({
            where:{id: id},
            relations:
            {
                pinfos:true
            },
        });
    }

    OTPsendemail (email: string) : any
    {
        const nodemailer = require('nodemailer');
        const Buffer = randomBytes(2);
        const otpCode = Buffer.readUInt16BE(0) % 10000;
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'ahmedsad0819@gmail.com',
              pass: 'xwianrfxkmlevxhb'
            }
          });
          
          const mailOptions = {
            from: 'ahmedsad0819@gmail.com',
            to: email,
            subject: 'YOUR OTP CODE',
            text: 'Your OTP CODE : ' + otpCode + '. Don not share your OTP CODE'
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
           console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
        return {otpCode};
    }
}