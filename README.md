# Will-A!

Welcome to Keystone!

Run

```
yarn dev
```

To view the config for your new app, look at [./keystone.ts](./keystone.ts)

This project starter is designed to give you a sense of the power Keystone can offer you, and show off some of its main features. It's also a pretty simple setup if you want to build out from it.

We recommend you use this alongside our [getting started walkthrough](https://keystonejs.com/docs/walkthroughs/getting-started-with-create-keystone-app) which will walk you through what you get as part of this starter.

If you want an overview of all the features Keystone offers, check out our [features](https://keystonejs.com/why-keystone#features) page.

## Some Quick Notes On Getting Started

### Changing the database
Just change the `db` property on the Keystone file [./keystone.ts](./keystone.ts) to

```typescript
db: {
    provider: 'postgresql',
    url: process.env.DB_URL || 'DATABASE_URL_TO_REPLACE',
}
```

And provide your database url from PostgreSQL.

For more on database configuration, check out or [DB API Docs](https://keystonejs.com/docs/apis/config#db)

### Auth

We've put auth into its own file to make this humble starter easier to navigate. To explore it without auth turned on, comment out the `isAccessAllowed` on line 21 of the Keystone file [./keystone.ts](./keystone.ts).

For more on auth, check out our [Authentication API Docs](https://keystonejs.com/docs/apis/auth#authentication-api)

