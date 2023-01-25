# CryptoStatList Back End API

This is the back end GraphQL api for the CryptoStatList web application. It is built on Express.js and uses MongoDB for data persistence.

### Installation

`npm intall`

### Authentication

The app uses Passport.js with JWTs that use public and private keys. Run the script [generateKeyPair](generateKeyPair.js) to generate your keys locally.

### Environment Variables

Populate the variables in `.env.example` and rename the file `.env`.

Database strings e.g. `DB_STRING_DEV` expects a MongoDB Atlas conection string URI. [Sign up](https://www.mongodb.com/atlas/database) for free account and cluster

### Running the Application Locally

`npm run devstart`
