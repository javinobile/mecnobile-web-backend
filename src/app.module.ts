import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // Add this line
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { User } from './user/user.entity';
import { Appointment } from './appointments/entities/appointment/appointment';

@Module({
  imports: [UserModule,
    TypeOrmModule.forRoot({
      type: 'postgres', // or your chosen database type
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'mecnobile',
      entities: [User, Appointment],
      synchronize: true, // only for development
    }),
    AuthModule,
    AppointmentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
