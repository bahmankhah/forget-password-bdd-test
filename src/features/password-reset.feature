@password-reset
Feature: Password Reset

Scenario: Successful password reset
  Given the user has forgotten their password
  When the user provides valid identification
  And the user requests a password reset
  Then the system sends a password reset link to the user's registered email
  When the user clicks the reset link
  And the user enters a new valid password
  Then the system updates the password
  And the user can log in with the new password

Scenario: Password reset with invalid email
  Given the user has forgotten their password
  When the user requests a password reset
  And the user provides an unregistered email address
  Then the system displays an error message indicating the email is not recognized

Scenario: Password reset with expired link
  Given the user has received a password reset email
  And the reset link has expired
  When the user clicks the expired reset link
  Then the system displays a message indicating the link has expired
  And the user is prompted to request a new password reset