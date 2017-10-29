# express-sequelize-starter
![TravisCI Status](https://travis-ci.org/ox42/express-sequelize-starter.svg?branch=master)

A starter boilerplate for a webapp using express, sequelize, migrations, passport, moment and other popular frameworks. Uses gulp for minification


To run migrations, use
node_modules/.bin/sequelize db:migrate


To run the app with docker, go to the app folder, build it with npm install and npm compile (for development), and use
docker run --name express-starter-app -p 3000:3000 -v `pwd`:/app -d keymetrics/pm2-docker-alpine:8 pm2-docker start --auto-exit --env development process.yml

For production, copy the source files to a separate directory (because one command will modify some of them), run npm install, run npm prepare-production (to minify, build and bust cache), and use
docker run --name express-starter-app -p 3000:3000 -v `pwd`:/app -d keymetrics/pm2-docker-alpine:8 pm2-docker start --auto-exit --env production process.yml
