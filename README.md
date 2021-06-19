# Wired Clan

Wired Clan is a project that started with the aim to bridge the gap between theoretical knowledge and practical expertise among college students.
Creating an exclusive community for students to learn and showcase their projects and also for conducting hackathons.
It is a PERN stack project built using react and redux.

![homepage](https://github.com/RiyaNegi/WiredClan/blob/dev/client/public/Screenshot%20from%202020-10-31%2012-21-18.png)
![page](https://github.com/RiyaNegi/WiredClan/blob/dev/client/public/Screenshot%20from%202020-10-24%2011-31-25.png)
![page](https://github.com/RiyaNegi/WiredClan/blob/dev/client/public/Screenshot%20from%202020-10-05%2012-38-37.png)


## Running Backend On Windows
- ### Install POSTGRESQL and REDIS and set the environment variables for the same
- ### cd into the backend folder and run the following installations
> - npm install (use node version 12.13.1)
> -  npm install -g sequelize
>  -  npm install -g sequelize-cli
>  -  npm install -g pg
>   -  npm install -g @babel/cli @babel/core
>    -  npm install -g @babel/node
>    - npm install -g babel-cli
>    - npm install --save-dev -g cross-env
- ### To Create Database run the following commands in backend folder
> - sequelize db:drop
> - sequelize db:create
> - psql -h localhost -p 5432 -U postgres -f jimmy_db_dev.sql jimmy_db
> - sequelize db:migrate
- ### Change the code of start command in scripts in package.json to 
> - "start": "cross-env NODE_ENV=development nodemon --exec babel-node api/api.js"
- ### Start POSTGRESQL and Redis Servers
- ### Run the backend with npm run start
## Running Frontend
- ### cd into client folder and run npm install
- ### Run the frontend with npm start
