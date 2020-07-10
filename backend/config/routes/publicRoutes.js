const publicRoutes = {
  'POST /register': 'UserController.register',
  'POST /googleRegister': 'UserController.googleRegister',
  'POST /login': 'UserController.login',
  'POST /googleLogin': 'UserController.googleLogin',
  'POST /validate': 'UserController.validate',
};

export default publicRoutes;
