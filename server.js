import "./env.js";
//1.import express
import express from 'express';
import swagger from 'swagger-ui-express';
import cors from 'cors';

import bodyParser from 'body-parser';
import productRouter from './src/features/product/product.routes.js';
import userRouter from './src/features/user/user.routes.js';
import jwtAuth from './src/middlewares/jwt.middleware.js';
import cartRouter from './src/features/cartItems/cartItems.routes.js';
import apiDocs from './swagger.json' assert {type: 'json'};
import loggerMiddleware from './src/middlewares/logger.middleware.js';
import { ApplicationError } from './src/error-handler/applicationError.js';
import { connectToMongoDB } from './src/config/mongodb.js';
import orderRouter from './src/features/order/order.routes.js';
import { connectUsingMongoose } from "./src/config/mongooseConfig.js";
import mongoose from "mongoose";
import likeRouter from "./src/features/like/like.routes.js";
//2.create server
const server = express();

// load all the environment variables in application
// dotenv.config();

// CORS policy configuration
var corsOptions = {
    origin: "http://localhost:5500"
}
server.use(cors(corsOptions));

// server.use((req, res, next)=>{
//     res.header('Access-Control-Allow-Origin','http://localhost:5500');
//     res.header('Access-Control-Allow-Headers','*');
//     res.header('Access-Control-Allow-Methods','*');
//     // return ok for preflight request.
//     if(req.method=="OPTIONS"){
//       return res.sendStatus(200);
//     }
//     next();
//   });

// parse application/json
server.use(bodyParser.json());

// Bearer <token>
server.use("/api-docs",
    swagger.serve,
    swagger.setup(apiDocs));

//middleware to handle logs
server.use(loggerMiddleware);

//for all requests related to order,redirect to order routes
server.use('/api/orders', jwtAuth, orderRouter);

//for all requests related to product,redirect to product routes
server.use('/api/products', jwtAuth, productRouter);

//for all requests related to cart,redirect to cart routes
server.use("/api/cartItems", jwtAuth, cartRouter);

//for all requests related to user,redirect to user routes
server.use('/api/users', userRouter);

//for all requests related to like,redirect to like routes
server.use('/api/likes', jwtAuth,likeRouter);

//3.default request handler
server.get('/', (req, res) => {
    res.send('Welcome to E-Commerce APIs');
});

//Error handling middleware
server.use((err, req, res, next) => {
    console.log(err);
    if (err instanceof mongoose.Error.ValidationError) {
        return res.status(400).send(err.message);
    }
    if (err instanceof ApplicationError) {
        res.status(err.code).send(err.message);
    }
    //server errors
    res.status(503).send("Something went wrong,please try again later");
});

// 4. Middleware to handle 404 requests.
server.use((req, res) => {
    res.status(404).send("API not found. Please check our documentation for more information at localhost:3900/api-docs")
});

//5.listen port
server.listen(3900, () => {
    console.log("server is running on port 3900");
    // connectToMongoDB();
    connectUsingMongoose();
});

