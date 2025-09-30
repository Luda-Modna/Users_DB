const { Router } = require('express');
const { usersController } = require('../controllers');

const userRouter = Router();

userRouter
  .route('./')
  .get(usersController.getUser)
  .post(usersController.createUser);

userRouter
  .route('./:id')
  .get(usersController.getUserById)
  .patch(usersController.updateUserById)
  .delete(usersController.deleteUserById);

module.exports = userRouter;
