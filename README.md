# Watchdog JS
A friendly bot helper that makes sure everything is ok with your public websites and apps.

## What does it do?
Watchdog runs multiple checks on a given URL to help warn you if your site has gone down, is about to go down or if your site has failed basic security checks.

Presently it executes these checks on demand from a Slack command, in the future though it will be capable of recording UR's in a database and running checks using scheduled tasks.

## What does it not do?
Watchdog simply keeps an eye on your websites and apps and warns you if it notices something unusual. Even when using Watchdog your site will go down - and more likely then not will have multiple security vulnerabilities. 

Watchdog is not a fully fledged monitoring solution. It is also not a fully fledged penetration testing tool. Watchdog can be used as a part of a wider monitoring and security prorgram - but Watchdog is not a silver bullet.


## Running Locally

```sh
$ yarn install
$ yarn start
```

## Deploying to Heroku

```
$ git push heroku master
$ heroku open
```

## Copyright
All rights are reserved by the contributors of this project Jack Schofield and Felisia Martini.
