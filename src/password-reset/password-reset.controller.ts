import { Body, Controller, Post } from '@nestjs/common';
import { PasswordResetService } from './password-reset.service';

@Controller('password-reset')
export class PasswordResetController {
  constructor(private readonly passwordResetService: PasswordResetService) {}

  @Post('request')
  requestReset(@Body('email') email: string) {
    return this.passwordResetService.requestReset(email);
  }

  @Post('reset')
  resetPassword(@Body() resetData: { token: string; newPassword: string }) {
    return this.passwordResetService.resetPassword(resetData);
  }
}
