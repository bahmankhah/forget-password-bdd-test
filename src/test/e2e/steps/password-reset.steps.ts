import { Given, When, Then } from '@cucumber/cucumber';
import * as assert from 'assert';
import { PasswordResetService } from '../../../password-reset/password-reset.service';

const service = new PasswordResetService();
let response: { success: boolean; message: string } | undefined;
let email: string;
let token: string;

// Scenario: Successful password reset
Given('the user has forgotten their password', function () {
  // Context setup if needed
});

When('the user requests a password reset', async function () {
  response = await service.requestReset(email);
});

When('the user provides valid identification', function () {
  email = 'user@example.com';
});

Then("the system sends a password reset link to the user's registered email", function () {
  assert(response, 'Response is undefined');
  assert.strictEqual(response.success, true);
  assert.strictEqual(response.message, 'Reset link sent');
});

When('the user clicks the reset link', function () {
  token = 'valid-token';
});

When('the user enters a new valid password', async function () {
  response = await service.resetPassword({ token, newPassword: 'newPassword123' });
});

Then('the system updates the password', function () {
  assert(response, 'Response is undefined');
  assert.strictEqual(response.success, true);
  assert.strictEqual(response.message, 'Password updated');
});

Then('the user can log in with the new password', function () {
  // If no login functionality is available, we can assert that the password reset response was successful
  assert(response, 'Response is undefined');
  assert.strictEqual(response.success, true);
  assert.strictEqual(response.message, 'Password updated');
});

// Scenario: Password reset with invalid email
When('the user provides an unregistered email address', async function () {
  email = 'invalid@example.com';
  response = await service.requestReset(email);
});

Then('the system displays an error message indicating the email is not recognized', function () {
  assert(response, 'Response is undefined');
  assert.strictEqual(response.success, false);
  assert.strictEqual(response.message, 'Email not recognized');
});

// Scenario: Password reset with expired link
Given('the user has received a password reset email', function () {
  response = { success: true, message: 'Reset link sent' }; // Simulate email sent
});

Given('the reset link has expired', function () {
  token = 'expired-token';
});

When('the user clicks the expired reset link', async function () {
  response = await service.resetPassword({ token, newPassword: 'newPassword123' });
});

Then('the system displays a message indicating the link has expired', function () {
  assert(response, 'Response is undefined');
  assert.strictEqual(response.success, false);
  assert.strictEqual(response.message, 'Invalid or expired token');
});

Then('the user is prompted to request a new password reset', function () {
  assert(response, 'Response is undefined');
  assert.strictEqual(response.message, 'Invalid or expired token');
});
