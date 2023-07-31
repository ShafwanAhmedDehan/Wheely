import { Options } from "@nestjs/common";
import { Equals, IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsNumberString, IsString, Matches, MaxLength, MinLength, ValidateIf, matches, minLength } from "class-validator"

export class LoginPassenger
{
    @IsString({message:"Invaild Input Data Type"})
    @IsNotEmpty({message:"Please Enter Email/Phone"})
    emailphn : string;
    @IsString({message:"Invaild Input Data Type"})  
    @IsNotEmpty({message:"Please Enter Password"})
    @MinLength(8,{message:"Password is too Short"})
    password : string;   
}

export class SignUpPassenger
{
    @IsString({message:"Invaild Input Data Type"})
    @IsNotEmpty({message:"Please Enter First Name"})
    @MaxLength(20,{message:"Maximum Length should be '70'"})
    @Matches(/^[A-Za-z\s]*$/,{message:"Invaild First Name"})
    fname : string;

    @IsString({message:"Invaild Input Data Type"})
    @IsNotEmpty({message:"Please Enter Last Name"})
    @MaxLength(30,{message:"Maximum Length should be '30'"})
    @Matches(/^[A-Za-z\s]*$/,{message:"Invaild Last Name"})
    lname : string;

    @IsString({message:"Invaild Input Data Type"})
    @IsNotEmpty({message:"Please Enter Email"})
    @IsEmail(undefined,{message:"Enter a Valid Email Address"})
    email : string;

    @IsString({message:"Invaild Input Data Type"})
    @IsNotEmpty({message:"Please Enter Phone No"})
    @IsNumberString(undefined,{message:"Enter Valid Phone No."})
    @Matches(/(^(\+8801|8801|01))[1|3-9]{1}(\d){8}$/,{message:"Invaild Phone no [Use BD Convention]"})
    phone : string;

    @IsString({message:"Invaild Input Data Type"})
    @IsNotEmpty({message:"Please Enter NID"})
    @IsNumberString(undefined,{message:"Enter Valid NID No."})
    nid : string;

    @IsString({message:"Invaild Input Data Type"})
    @IsNotEmpty({message:"Please Enter Password"})
    @MinLength(8,{message:"Password is Too Short"})
    password : string;

    @IsString({message:"Invaild Input Data Type"})
    @IsNotEmpty({message:"Please Enter Phone No"})
    gender : string;

    @IsNumber({maxDecimalPlaces:2},{message:"Invaild Input Data Type or Digit more than '2'"})
    @IsNotEmpty({message:"Please Enter Your Age"})
    age : number;
}

export class ForgetPassword
{
    @IsString({message:"Invaild Input Data Type"})
    @IsNotEmpty({message:"Please Enter Phone No"})
    @IsNumberString(undefined,{message:"Enter Valid Phone No."})
    @Matches(/(^(\+8801|8801|01))[1|3-9]{1}(\d){8}$/,{message:"Invaild Phone no [Use BD Convention]"})
    phone : string;
    
    @IsString({message:"Invaild Input Data Type"})
    @IsNotEmpty({message:"Please Enter Password"})
    @MinLength(8,{message:"Password is Too Short"})
    newpassword : string;

    @IsString({message:"Invaild Input Data Type"})
    @IsNotEmpty({message:"Please Enter Password"})
    @MinLength(8,{message:"Password is Too Short"})
    confirmpassword : string;
}

export class studentApplication
{
    @IsString({message:"Invaild Input Data Type"})
    @IsNotEmpty({message:"Please Enter Your Institution Name"})
    @MaxLength(100,{message:"Maximum Length should be '100'"})
    instname : string;

    @IsString({message:"Invaild Input Data Type"})
    @IsNotEmpty({message:"Please Enter Your Student ID"})
    studentid : string;   

    @IsString({message:"Invaild Input Data Type"})
    @IsNotEmpty({message:"Please Enter Your Educational Level"})
    level : string
}

export class VehicleInfo
{
    vnumber : string
    ownName : string = "Dehan Ahmed"
    ownPhoneNo : string = "0178155027"
}

export class EmergencyContact
{
    @IsString({message:"Invaild Input Data Type"})
    @IsNotEmpty({message:"Please Enter Phone No"})
    @IsNumberString(undefined,{message:"Enter Valid Phone No."})
    @Matches(/(^(\+8801|8801|01))[1|3-9]{1}(\d){8}$/,{message:"Invaild Phone no [Use BD Convention]"})
    emrContact : string
    @IsNumber({maxDecimalPlaces:50},{message:"Invaild Input Data Type or Digit more than '50'"})
    @IsNotEmpty({message:"Please Enter Your id"})
    pinfo : number
}

export class ProfilePhoto
{
    ppfilename:string;
    @IsNumber({maxDecimalPlaces:50},{message:"Invaild Input Data Type or Digit more than '50'"})
    @IsNotEmpty({message:"Please Enter Your id"})
    pinfo:number
}


export class UpdateProfile
{
    phonenoID : string;

    @IsString({message:"Invaild Input Data Type"})
    @IsNotEmpty({message:"Please Enter First Name"})
    @MaxLength(20,{message:"Maximum Length should be '70'"})
    @Matches(/^[A-Za-z\s]*$/,{message:"Invaild First Name"})
    fname : string;

    @IsString({message:"Invaild Input Data Type"})
    @IsNotEmpty({message:"Please Enter Last Name"})
    @MaxLength(30,{message:"Maximum Length should be '30'"})
    @Matches(/^[A-Za-z\s]*$/,{message:"Invaild Last Name"})
    lname : string;

    @IsString({message:"Invaild Input Data Type"})
    @IsNotEmpty({message:"Please Enter Email"})
    @IsEmail(undefined,{message:"Enter a Valid Email Address"})
    email : string;

    @IsString({message:"Invaild Input Data Type"})
    @IsNotEmpty({message:"Please Enter Phone No"})
    @IsNumberString(undefined,{message:"Enter Valid Phone No."})
    @Matches(/(^(\+8801|8801|01))[1|3-9]{1}(\d){8}$/,{message:"Invaild Phone no [Use BD Convention]"})
    phone : string;

    @IsNumber({maxDecimalPlaces:2},{message:"Invaild Input Data Type or Digit more than '2'"})
    @IsNotEmpty({message:"Please Enter Your Age"})
    age : number;
}
