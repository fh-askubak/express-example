//requirements
const express = require('express');
const userController = require('../controllers/userController');

function routes(User) {
    //user router
    const userRouter = express.Router();
    //controller
    const controller = userController(User);
    //get all users
    userRouter.route('/')
    .get(controller.get);
    //find single user
    userRouter.route('/:id')
    .get(controller.getOne)
    //update user
    .patch(controller.patch);
    //add new user
    userRouter.route('/new')
    .post(controller.post);
    //return user router obj
  return userRouter;
}

module.exports = routes;