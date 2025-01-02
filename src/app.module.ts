import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './password-reset/user.entity';
import { PasswordResetModule } from './password-reset/password-reset.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User], // Register your entity here
      synchronize: true, // Auto-create schema in development
    }),
    PasswordResetModule,
  ],
})
export class AppModule {}
