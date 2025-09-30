const { Router } = require('express');
const { usersController } = require('../controllers');

const usersRouter = Router();

usersRouter
  .route('/')
  .get(usersController.getUser)
  .post(usersController.createUser);

usersRouter
  .route('/:id')
  .get(usersController.getUserById)
  .patch(usersController.updateUserById)
  .delete(usersController.deleteUserById);

module.exports = usersRouter;
