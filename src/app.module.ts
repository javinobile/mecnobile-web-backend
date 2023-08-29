import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // Add this line
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule,
    TypeOrmModule.forRoot({
      type: 'postgres', // or your chosen database type
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'mecnobile',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // only for development
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
