Feature: Login

  Scenario: User types not an email
    Given a user
    When the user types an invalid email address "invalid_address"
    Then the login button is disabled
