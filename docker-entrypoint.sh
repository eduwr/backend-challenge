#!/bin/sh

npm i

npx sequelize db:migrate

npm start