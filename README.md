# express-sequelize-starter
![TravisCI Status](https://travis-ci.org/ox42/express-sequelize-starter.svg?branch=master)

This project provides a starter boilerplate for a webapp using express, sequelize (with migrations, and a simple sqlite setup for local testing),
 passport (for authentication), moment and other popular frameworks. This is something we use at our company to quickly bootstrap new projects,
  and it is tested in production by at least three apps as of now, powering several servers with thousands of daily users.

We use this boilerplate for both smaller and bigger projects, but you should note it doesn't include any major client side framework like React or Angular.
Instead, it uses jQuery, and gulp for concatenation and minification (allowing you to have a separate script file for every page, which is later automatically
concatenated to one script file). The frontend design for the app uses Bootstrap v3 (latest stable release).

<p align="center">
<img src="/docs/express-demo-1.jpg" width="700">
<img src="/docs/express-demo-2.jpg" width="700">
<img src="/docs/express-demo-3.jpg" width="700">
</p>

The repository (once you clone it) contains a demonstration of an authentication workflow with passport (including migrations and username/password login),
with security principles in mind (like, hashing the passwords). You can use this to quickly startup new projects.


## Install
 Please make sure you are using the latest version of Node (at least v8), because we use async/await. Once you clone the project, just install all modules with

```bash
 $ npm install
 ```

Later, you can just run the application locally with the following command:

```bash
$ npm run start
```

That will start a server at port 3000 (accessable at http://localhost:3000), with monitoring of files. Basically, if you make any changes to your files, they will
be automatically compiled, so when you refresh your browser (page), you will get the latest version of the app.

Once you start the app, you can click on the "Authentication" link, and login with "admin@express.org" and password "secret". What you'll see is a basic example
of authentication, but by looking in the routes, you can see how some of them are restricted (for logged in users), and some are unrestricted. This allows you to
modify the code and create a new (smaller or bigger) app just by following the principles outlined in the source code.


## Routes
 Most of the time, you'll be working by creating new routes. Those are done in the routes/ directory, so start by taking a look there, as there is already an example file
 describing how the process works. Inside, you'll be able to find how to run database queries with async/await, which is just beautiful.

## Database and migrations
 If you want to add another table or column, you need to look at the models/ directory and add your new table definition there (as a new .js file). Afterwards, you just
 create a new migration in the migrations/ directory. There are already some examples there for an "Accounts" table, so it's very easy to create new ones just by
 following what's already presented.

 Once you have your migrations created, you can just run them with:

```bash
$ node_modules/.bin/sequelize db:migrate
```

 By default, if you look at the config/ directory, you will see that the application uses sqlite. In production, you will probably want to modify the sequelize config
 and use a better database management system. We love using PostgreSQL, so we recommend you use that. You can find a bunch of examples online, but we suggest you do
 something like this:

```json
{
  "production": {
    "username": "postgres",
    "password": "secretkey",
    "database": "db_name",
    "host": "postgres",
    "dialect": "postgres",
    "logging": false
}
```


## Docker
To run the app with docker, go to the source directory (the main folder of the app), build it with npm install and npm compile (for development), and use

```bash
docker run --name express-starter-app -p 3000:3000 -v `pwd`:/app -d keymetrics/pm2-docker-alpine:8 pm2-docker start --auto-exit --env development process.yml
```

For production, first copy the source files to a separate directory (because our command will modify some of them), run npm install and npm prepare-production
(to minify, build and bust cache), and use

```bash
docker run --name express-starter-app -p 3000:3000 -v `pwd`:/app -d keymetrics/pm2-docker-alpine:8 pm2-docker start --auto-exit --env production process.yml
```


## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2017 0x42 <[https://mk.linkedin.com/in/bojan-kostadinov-38217615](https://mk.linkedin.com/in/bojan-kostadinov-38217615)>
