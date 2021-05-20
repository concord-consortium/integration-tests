# Integration Tests

These are Cypress integration tests to verify Learn Portal / LARA / Reports integration

## Steps to run these tests

- In your terminal, run :
```
  git clone https://github.com/concord-consortium/learn-portal-cypress-tests.git
```
- Once cloned, install necessary node_modules and dependencies (including Cypress) using :
```
npm install
```
- To run the headless version of the tests, run the following command :
```
npm run -s test:run -- -e password=<...>,testEnv=<...>
```
- To run the tests in a browser, run the following command :
```
npm run -s test:open -- -e password=<...>,testEnv=<...>
```
- Once the tests run, a HTML report is available at the location :
```
./cypress/reports/html/mochawesome-bundle.html
```
- The value for the password <...> in the above command line argument will be used to login to the LEARN Portal as various users (teacher, author, researcher, manager, student and admin) and the password needs to be the same for all these users. The usernames used by the tests can be found in [environments.json](https://github.com/concord-consortium/learn-portal-cypress-tests/blob/master/configuration/environments.json)
- The value for the testEnv <...> in the above command line argument will be used to launch various environments of the LEARN Portal and can be dev, staging or production at the moment

## Prerequisites

Following are the prerequisites for running these tests :
- To run the tests for testEnv=dev , the LEARN Portal needs to be running locally in your computer and should be accessible via the URL : http://app.portal.docker
- The db needs to setup with mock data so that the users are all setup.
