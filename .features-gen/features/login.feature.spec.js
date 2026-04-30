// Generated from: features\login.feature
import { test } from "playwright-bdd";

test.describe('User Login', () => {

  test('Login with valid credentials', async ({ Given, When, Then, page }) => { 
    await Given('User navigates to login page', null, { page }); 
    await When('User logs in with valid credentials'); 
    await Then('User should see the rooms management header'); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features\\login.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":3,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given User navigates to login page","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":5,"keywordType":"Action","textWithKeyword":"When User logs in with valid credentials","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":6,"keywordType":"Outcome","textWithKeyword":"Then User should see the rooms management header","stepMatchArguments":[]}]},
]; // bdd-data-end