Feature: User Login

    Scenario: Login with valid credentials
        Given User navigates to login page
        When User logs in with valid credentials
        Then User should see the rooms management header