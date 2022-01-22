# Vulcan Gaming Platform - Web

This is a monorepo for all of the websites on the platform.

## Tech Stack

- React
- TypeScript
- Create-React-App (webpack, eslint)
- GraphQL
- Chakra UI
- Apollo
- GraphQL Codegen

## Getting Started

1. `npm i`: This will install all necessary dependencies and will codegen additional source code
2. `cp .env.template .env.local`: This will create your local environment configuration
3. Fill in `.env.local` with how you want to run the web platform
4. `npm start`

## Site: `app`

The `app` site is located in `src/app`. Additional information can be found there.

When a user deploys their own instance of the Vulcan Gaming Platform one of the components they are deploying is `app`. It is the interface for users to interact with Vulcasts and play games.

## Site: `static`

The `static` site is located in `src/static`. Additional information can be found there.

This site is the only site that the Vulcan Gaming Platform team hosts. It is generally users' first point of entry to the platform. From there they can learn what Vulcan is, how to set up their own instance and how to play with their friends.

## Deprecated Section - Re-Write Incoming

### To connect to local development backend or relay:

In src/setupProxy.js:
Backend - change the URL from vulcangames.fun to http://localhost:4000
Relay - change the URL from vulcangames.fun:8433 to http://localhost:8433
