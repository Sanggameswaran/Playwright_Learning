Playwright Learning: Test Automation Framework

An end-to-end test automation framework built with Playwright and TypeScript, using the Page Object Model (POM) pattern. It is both a working framework and a learning project: every core Playwright topic is practised against a demo page, and a cheat sheet is included for quick revision.

Table of Contents
Tech Stack
Project Structure
Getting Started
Running Tests
Topics Covered
Page Object Model
Authentication and Storage State
CI/CD with GitHub Actions
Cheat Sheet
Best Practices Followed
Troubleshooting
Tech Stack
Tool	Purpose
Playwright Test	Browser automation and test runner
TypeScript	Typed test and page object code
Node.js	Runtime
GitHub Actions	Continuous integration
Project Structure
Playwright/
├── .github/
│   └── workflows/
│       └── playwright.yml      # CI pipeline
├── .playwright/
│   └── .auth/                  # Saved login state (git-ignored)
├── pageObjects/                # Page Object classes (locators + actions)
│   └── KeyboardPage.ts
├── tests/                      # Test specs
│   └── KeyboardActions.spec.ts
├── playwright.config.ts        # Playwright configuration
├── package.json
├── tsconfig.json
├── .gitignore
└── README.md

Add each new page class to pageObjects/ and each new spec to tests/.

Getting Started
Prerequisites
Node.js 18 or later
Git
Installation
bash
# 1. Clone the repository
git clone https://github.com/Sanggameswaran/Playwright_Learning.git
cd Playwright_Learning

# 2. Install dependencies
npm install

# 3. Install Playwright browsers
npx playwright install
Running Tests
bash
# Run all tests (headless)
npx playwright test

# Run in headed mode (see the browser)
npx playwright test --headed

# Run one spec file
npx playwright test tests/KeyboardActions.spec.ts

# Run a test by name
npx playwright test -g "arrow counter"

# Run in a single browser
npx playwright test --project=chromium

# Debug step by step with the Inspector
npx playwright test --debug

# Interactive UI mode
npx playwright test --ui

# Open the last HTML report
npx playwright show-report

# Generate locators by recording actions
npx playwright codegen <url>
Topics Covered

Each topic is practised against a demo page with dedicated sections.

#	Topic	What is practised
1	Locators	getByRole, getByText, getByPlaceholder, getByLabel, getByTestId, CSS and XPath
2	Actions	click, fill, press, pressSequentially, check, selectOption
3	Assertions	Auto-retrying expect (toHaveText, toBeVisible, toHaveValue, toBeFocused, and others)
4	Hover Menu and Tooltip	hover() and validating revealed content
5	File Upload and Download	setInputFiles, waitForEvent('download')
6	Hidden Elements	Visibility checks and interacting with hidden or conditional elements
7	Scroll Testing	scrollIntoViewIfNeeded, scroll-triggered content
8	Multiple Windows and Tabs	Handling new pages and popups with context.waitForEvent('page')
9	Authentication Simulation	Login flows and reusing session with storage state
10	Stale Element Simulation	Why Playwright locators avoid stale element errors
11	Dynamic Lists	Adding and removing items, counting with locator.count()
12	Network Delay Simulation	Auto-waiting and handling slow responses
13	Flaky Elements	Retries, auto-waiting, and writing stable tests
14	Keyboard Actions	Key presses, key combos, and validating "last key" and counter updates
15	Page Object Model	Separating locators and actions from test logic
16	Hooks and Test Structure	test.describe, beforeEach, afterEach
17	Config and Reporters	Timeouts, retries, projects, and HTML reports
18	CI/CD	Running tests in GitHub Actions
Page Object Model

Locators and actions live in page classes. Tests stay clean and only describe the scenario and the expected result.


Authentication and Storage State

Login state can be saved once and reused so tests skip the login screen.

Saved state is stored under .playwright/.auth/.
This folder contains session tokens. It must stay in .gitignore and must never be committed.
# .gitignore
.playwright/.auth/
node_modules/
test-results/
playwright-report/
.env

In CI, the auth file does not exist on the runner, so the workflow (or a setup project) must create it before the tests run.

CI/CD with GitHub Actions

The workflow is defined in .github/workflows/playwright.yml and runs on push and pull requests.

Typical steps:

Checkout the code
Set up Node.js
npm ci
npx playwright install --with-deps
npx playwright test
Upload the HTML report as an artifact

Tips:

Install only the browsers you need, for example npx playwright install --with-deps chromium.
Set timeout-minutes on the job so a hung step fails fast.
Download the uploaded playwright-report artifact from the run page to view results.
Cheat Sheet

A revision cheat sheet is included in this repository: CHEATSHEET.md (replace with the actual file name).

Use it for quick revision of locators, actions, assertions, waits, and common patterns before practice or interviews.

Best Practices Followed
Prefer user-facing locators (getByRole, getByText, getByLabel) over brittle CSS or XPath.
Rely on Playwright's auto-waiting and web-first assertions; avoid fixed waitForTimeout sleeps.
Keep tests independent, so each test sets up its own state.
Use the Page Object Model to avoid duplicating locators.
Keep assertions in the tests, not in the page classes.
Never commit secrets, tokens, or saved auth state.
