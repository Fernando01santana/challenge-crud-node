// utils/utils.module.ts
import { Module } from '@nestjs/common';
import { PasswordUtils } from './encryptPassword';

@Module({
  providers: [PasswordUtils],
  exports: [PasswordUtils],
})
export class UtilsModule {}
