# Bookstore API Automation Framework

## Overview

This project is an **API automation framework** built with Playwright (TypeScript) to test the **Bookstore API**.  
It validates all CRUD operations on books, user authentication flows, and secure endpoints. The framework is designed to be modular, scalable, and CI/CD ready.

## Features

- **CRUD Testing**: Covers create, read, update, and delete operations for books.
- **Authentication Testing**: Validates login and token-based secured endpoints.
- **Reusable Utilities**: Centralized config, headers, and test data.
- **Test Reports**: Supports Playwright HTML reports (and Allure if required).
- **CI/CD Ready**: Can be integrated into GitHub Actions, GitLab, or Jenkins.

## Technologies

- **Playwright Test**: Modern end-to-end testing framework.
- **TypeScript**: Strongly-typed JavaScript for maintainable test code.
- **Node.js (v18+)**: Runtime for executing Playwright tests.
- **Allure Reports** (optional): For advanced test reporting.

## Getting Started

### Prerequisites

- Node.js v18+
- npm (Node package manager)
- Bookstore FastAPI app running locally or in Docker (API under test)

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/bookstore-automation.git
    ```

2. Navigate to the project directory:
    ```bash
    cd bookstore-automation
    ```

3. Install dependencies:
    ```bash
    npm install
    npx playwright install
    ```

### Running the Tests

- Run all tests:
    ```bash
    npx playwright test
    ```

- Run specific test suites:
    ```bash
    npm run test:auth
    npm run test:books
    npm run test:negativeScanerio
    ```

- Generate and open HTML report:
    ```bash
    npm run test:report
    ```

### Project Structure
bookstore-automation/
│── bookstore/                  
│── tests/                      
│   ├── api/
│   │   ├── auth.spec.ts
│   │   ├── booksCrud.spec.ts
│   │   └── negativeScanerio.spec.ts
│   └── utils/
│       ├── testData.ts
│       ├── helpers.ts
│       └── auth.ts
│── package.json               
│── README.md         

### Environment Setup

- Update the `.env` or config files to match your setup:
    ```env
    API_BASE_URL=http://localhost:8000
    API_TOKEN=your-jwt-token
    ```

- Helper functions (`getBaseURL`, `getHeaders`) automatically use these values.

### Running in CI/CD

This framework is designed to run seamlessly in CI/CD pipelines (e.g., GitHub Actions).  

- The FastAPI server is started automatically in the workflow.  
- Playwright API tests are executed after the server is healthy.  
- Test results and reports are generated as workflow artifacts.  

👉 Check `.github/workflows/ci.yml` for the exact pipeline configuration.  