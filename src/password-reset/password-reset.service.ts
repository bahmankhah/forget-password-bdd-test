import { Injectable } from '@nestjs/common';
@Injectable()
export class PasswordResetService {
    private users:{ email: string; password: string; resetToken: string | null}[] = [
        { email: 'user@example.com', password: 'oldPassword', resetToken: null },
      ];
    
      async requestReset(email: string) {
        const user = this.users.find((user) => user.email === email);
        if (!user) {
          return { success: false, message: 'Email not recognized' };
        }
        user.resetToken = 'valid-token'; // Generate secure token in real app
        return { success: true, message: 'Reset link sent' };
      }
    
      async resetPassword(resetData: { token: string; newPassword: string }) {
        const user = this.users.find((user) => user.resetToken === resetData.token);
        if (!user) {
          return { success: false, message: 'Invalid or expired token' };
        }
        user.password = await resetData.newPassword;
        user.resetToken = null;
        return { success: true, message: 'Password updated' };
      }
}
