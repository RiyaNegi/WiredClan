// const bodyParser from 'body-parser');
// const express from 'express');
// const mapRoutes from 'express-routes-mapper');

// const config from '../../config/');
// const database from '../../config/database');
// const auth from '../../api/policies/auth.policy');

// const beforeAction = async () => {
//   const testapp = express();
//   const mappedOpenRoutes = mapRoutes(config.publicRoutes, 'api/controllers/');
//   const mappedAuthRoutes = mapRoutes(config.privateRoutes, 'api/controllers/');

//   testapp.use(bodyParser.urlencoded({ extended: false }));
//   testapp.use(bodyParser.json());

//   testapp.all('/private/*', (req, res, next) => auth(req, res, next));
//   testapp.use('/public', mappedOpenRoutes);
//   testapp.use('/private', mappedAuthRoutes);


//   await database.authenticate();
//   await database.drop();
//   await database.sync().then(() => console.log('Connection to the database has been established successfully'));

//   return testapp;
// };

// const afterAction = async () => {
//   await database.close();
// };


// export default { beforeAction, afterAction };
