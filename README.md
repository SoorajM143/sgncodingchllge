# sgncodingchllge

## Introduction

Fetch weather related data from API

Please make sure you have the following installed before proceeding.

* Node.js: https://nodejs.org/en/download
* Npm: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
* Postgres admin: https://www.postgresql.org/download/
* Typescript: https://www.npmjs.com/package/typescript
* Typeorm: https://www.npmjs.com/package/typeorm
* ExpressJs: https://www.npmjs.com/package/express
* Postman: https://www.postman.com/downloads/


For testing: 

* jest: https://www.npmjs.com/package/jest
* supertest: https://www.npmjs.com/package/supertest
* better-sqlite: https://www.npmjs.com/package/better-sqlite3


# Instruction: 

* Run 'npm run dev' start the application.
* Run 'npm run migration:generate' to generate SQL for creating tables
* Run 'npm run migration:run' to execute and create the Tables


## API Endpoints

| HTTP       | Endpoints        | Action                                     |
|------------|------------------|--------------------------------------------|
| GET        | /api/sensor/:id  | Get sensor information for given Sensor id |
| GET        | /api/sensor/     | Get all sensors                            |
| GET        | /api/sensorsData | query sensor data                          |


## Credits

This Weather service created by Sooraj Mohan