import { Module } from '@nestjs/common';
import { PassengerModule } from './Passenger/Passenger.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [PassengerModule, TypeOrmModule.forRoot(
    {
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'dehan221999',
      database : 'Wheely',
      autoLoadEntities : true,
      synchronize : true,
    }
  ), MailerModule.forRoot(
    {
      transport: {
        host : 'smtp.gmail.com',
        port : 465,
        ignoreTLS : true,
        secure : true,
        auth : {
          user : 'ahmedsad0819@gmail.com',
          pass : 'xwianrfxkmlevxhb'
    }
}})],
  controllers: [],
  providers: [],
})
export class AppModule {}
