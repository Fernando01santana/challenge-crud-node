import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'dotenv';
import { UtilsModule } from 'src/shared/utils/utils.module';
import { UsersModule } from '../users/users.module';
import { AuthenticationController } from './controllers/auth.controllers';
import { AuthenticationService } from './services/auth.service';
config();

const configService = new ConfigService();

@Module({
  imports: [
    JwtModule.register({
      secret: configService.get('SECRET_KEY'),
      signOptions: { expiresIn: configService.get('SECRET_DURATION') },
    }),
    UsersModule,
    UtilsModule,
  ],
  providers: [AuthenticationService],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
