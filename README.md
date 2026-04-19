Restful Booker — Playwright Automation Framework
A production-grade test automation framework built with Playwright and TypeScript, covering both UI and API layers of the Restful Booker web application. Designed with scalability, maintainability, and real-world engineering practices in mind.

Tech Stack
ToolPurposePlaywrightBrowser automation and API testingTypeScriptStrongly typed test codeFaker.jsDynamic test data generationLuxonDate manipulation and formattingLodashDeep merging of test data objectsZodAPI response schema validationGitHub ActionsCI/CD pipelinedotenvEnvironment variable management

Framework Architecture
RESTFULLBOOKER/
├── .github/
│   └── workflows/
│       └── playwright.yml          # CI/CD pipeline configuration
├── config/
│   └── env.ts                      # Typed environment variable exports
├── constants/
│   ├── endpoints.ts                # All API endpoint paths
│   ├── errorMessages.ts            # Expected API error message strings
│   └── statusCodes.ts              # HTTP status code constants
├── fixtures/
│   ├── api/
│   │   ├── api-utils.ts            # Shared API utility methods
│   │   └── request-context.ts      # APIRequestContext fixture with auth token
│   └── ui/
│       └── page-instance.ts        # Page fixture with PageFactory injection
├── pages/
│   ├── components/
│   │   ├── contact-component.ts    # Reusable contact form component
│   │   └── navigation-component.ts # Reusable navigation component
│   ├── base-page.ts                # Base class with shared page methods
│   └── home-page.ts                # Home page object
├── test-data/                      # Static test data and schemas
├── tests/
│   ├── api/
│   │   ├── delete-requests/        # DELETE booking test cases
│   │   ├── get-requests/           # GET booking test cases
│   │   ├── post-requests/          # POST booking test cases
│   │   └── put-requests/           # PUT booking test cases
│   └── ui-test/
│       ├── contact-form-negative.spec.ts
│       ├── contact-form-positive.spec.ts
│       └── home-page-positive.spec.ts
└── utils/
    └── helpers/                    # Factory functions and test data generators

Design Patterns
This framework implements the following design patterns:

Page Object Model (POM) — UI interactions encapsulated in page classes, decoupled from test logic
Component Pattern — Reusable UI components (navigation, contact form) shared across page objects
Facade Pattern — Page objects grouped by feature rather than URL
Factory Pattern — PageFactory class injected via fixtures for clean page object instantiation
Builder Pattern — createBookingPayload() factory function with overrides for flexible test data generation
Base Class Pattern — BasePage provides shared methods inherited by all page objects


Prerequisites

Node.js v18 or higher
npm v8 or higher
Git


Installation
1. Clone the repository:
bashgit clone https://github.com/sudeepcraj2022-design/restful-booker-playwright-API_UI
cd restful-booker-playwright-API_UI
2. Install dependencies:
bashnpm ci
3. Install Playwright browsers:
bashnpx playwright install --with-deps
4. Set up environment variables:
Create a .env file in the root of the project:
dotenvBASE_URL=https://automationintesting.online
REST_USERNAME=admin
REST_PASSWORD=password

The .env file is listed in .gitignore and must never be committed to version control.


Running Tests
Run the full test suite
bashnpx playwright test
Run API tests only
bashnpx playwright test tests/api
Run UI tests only
bashnpx playwright test tests/ui-test
Run smoke tests only
bashnpx playwright test --grep @smoke
Run regression tests only
bashnpx playwright test --grep @regression
Run a specific test file
bashnpx playwright test tests/api/post-requests/booking-create.spec.ts
Run tests in headed mode (with visible browser)
bashnpx playwright test --headed
Run tests on a specific browser
bashnpx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

Viewing Test Reports
HTML Report
After a test run, open the HTML report:
bashnpx playwright show-report
Trace Viewer
To debug a specific test failure using trace viewer:
bashnpx playwright show-trace test-results/path-to-trace/trace.zip
Traces are captured automatically on first retry when a test fails in CI.

Test Coverage
API Tests
ModuleTest CasesTypes CoveredAuthentication8Positive, Negative, Edge, SecurityCreate Booking10Positive, Negative, EdgeGet Booking8Positive, Negative, EdgeUpdate Booking8Positive, Negative, EdgeDelete Booking6Positive, Negative, Edge
UI Tests
ModuleTest CasesTypes CoveredHomepagePositiveLayout, images, room cardsContact FormPositive, NegativeValidation, submission, error states

CI/CD Pipeline
Tests run automatically on every push and pull request to main via GitHub Actions.
The pipeline:

Checks out the code
Sets up Node.js
Installs dependencies
Installs Playwright browsers
Runs the full test suite using secrets for credentials
Uploads the HTML report as a workflow artifact (retained for 30 days)

Environment secrets required in GitHub repository settings:
Secret NameDescriptionBASE_URLApplication base URLREST_USERNAMEAdmin usernameREST_PASSWORDAdmin password

Key Framework Features
Storage State Authentication — Auth state is saved and reused across tests, eliminating redundant login flows and significantly reducing suite execution time.
Dynamic Test Data — Booking payloads are generated with random room IDs and future dates using Faker.js and Luxon, preventing test conflicts across runs.
Schema Validation — API responses are validated against Zod schemas to verify the full response contract, not just individual field values.
Environment Configuration — All environment-specific values are managed through .env locally and GitHub Secrets in CI, with no hardcoded values anywhere in the codebase.
Parallel Execution — Tests run in parallel across multiple workers by default, with authenticated and unauthenticated test suites isolated via Playwright projects configuration.

Path Aliases
The following TypeScript path aliases are configured for clean imports:
typescriptimport { ENV } from '@config/env';
import { ENDPOINTS } from '@constants/endpoints';
import { createBookingPayload } from '@helpers/bookingFactory';
import { test, expect } from '@fixtures/api/request-context';

Application Under Test
Restful Booker — https://automationintesting.online
A hotel booking web application with both a public-facing UI and a REST API, used widely in the testing community for automation practice.
EndpointDescriptionPOST /api/auth/loginGenerate authentication tokenGET /api/booking/:idGet booking by IDGET /api/booking?roomid=1Get bookings by roomPOST /api/bookingCreate a new bookingPUT /api/booking/:idUpdate an existing bookingDELETE /api/booking/:idDelete a bookingGET /api/roomGet all roomsGET /api/brandingGet branding information

Author
Sudeep C Raj

LinkedIn: [https://www.linkedin.com/in/sudeep-raj-b554b7210/?skipRedirect=true]
GitHub: [https://github.com/sudeepcraj2022-design]