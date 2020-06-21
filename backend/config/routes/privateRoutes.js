const privateRoutes = {
  // Account routes
  'GET /account': 'AccountController.get',
  'PATCH /account': 'AccountController.update',

  // User routes
  'GET /users': 'UserController.getAll',
  'GET /users/:id': 'UserController.get',
  'PATCH /users/:id': 'UserController.edit',

  // User routes
  'GET /tags/': 'TagController.getAll',

  // Posts routes
  'GET /posts': 'PostController.getAll',
  'GET /posts/:id': 'PostController.get',
  'POST /posts': 'PostController.create',
  'POST /posts/:id/': 'PostController.edit',
  'DELETE /posts/:id/': 'PostController.destroy',
  'POST /posts/:postId/comments': 'PostController.createComment',
  'POST /posts/:postId/comments/:id': 'PostController.editComment',
  'DELETE /posts/:postId/comments/:id': 'PostController.deleteComment',

  // Likes routes
  'POST /likes': 'LikeController.create',


};

module.exports = privateRoutes;
