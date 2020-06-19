const privateRoutes = {
  // Account routes
  'GET /account': 'AccountController.get',
  'PATCH /account': 'AccountController.update',

  // User routes
  'GET /users/:id': 'UserController.get',
  'PATCH /users/:id': 'UserController.edit',

  // Posts routes
  'GET /posts': 'PostController.getAll',
  'GET /posts/:id': 'PostController.get',
  'POST /posts': 'PostController.create',
  'POST /posts/:id/': 'PostController.edit',
  'DELETE /posts/:id/': 'PostController.destroy',
  'POST /posts/:postId/comments': 'PostController.createComment',
  'POST /posts/:postId/comments/:id': 'PostController.editComment',
  'DELETE /posts/:postId/comments/:id': 'PostController.deleteComment',

};

module.exports = privateRoutes;
