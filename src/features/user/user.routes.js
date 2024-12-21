//Manage routes or paths for UserController

//1.import express
import express from "express";
import UserController from "./user.controller.js";
import jwtAuth from '../../middlewares/jwt.middleware.js';

//2.Intialize Express router
//the goal of this router is to specify your path that when this path matches then call controller
const userRouter = express.Router();

const userController = new UserController();

//all the paths to controller methods
//localhost/api/users
userRouter.post('/signup',(req, res,next)=>{
    userController.signUp(req, res,next)
});

userRouter.post('/signin',(req, res)=>{
    userController.signIn(req, res)
});

userRouter.put('/resetPassword', jwtAuth, (req, res, next)=>{
    userController.resetPassword(req, res, next)
});

export default userRouter;