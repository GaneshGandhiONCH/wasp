import merge from 'lodash.merge'

import { stripTrailingSlash } from "./universal/url.js";

const env = process.env.NODE_ENV || 'development'

// TODO:
//   - Use dotenv library to consume env vars from a file.
//   - Use convict library to define schema and validate env vars.
//  https://codingsans.com/blog/node-config-best-practices

const config = {
  all: {
    env,
    port: parseInt(process.env.PORT) || 3001,
    databaseUrl: process.env.DATABASE_URL,
    frontendUrl: undefined,
    auth: {
      jwtSecret: undefined
    }
  },
  development: {
    frontendUrl: stripTrailingSlash(process.env.WASP_WEB_CLIENT_URL) || 'http://localhost:3000',
    auth: {
      jwtSecret: 'DEVJWTSECRET'
    }
  },
  production: {
    frontendUrl: stripTrailingSlash(process.env.WASP_WEB_CLIENT_URL),
    auth: {
      jwtSecret: process.env.JWT_SECRET
    }
  }
}

const resolvedConfig = merge(config.all, config[env])
export default resolvedConfig