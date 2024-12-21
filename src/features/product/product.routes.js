//Manage routes or paths for ProductController

//1.import express
import express from "express";
import { upload } from '../../middlewares/fileUpload.middleware.js';
import ProductController from "./product.controller.js";

//2.Intialize Express router
//the goal of this router is to specify your path that when this path matches then call controller
const productRouter = express.Router();

const productController = new ProductController();

//all the paths to controller methods
//localhost/api/products
productRouter.post('/rate', (req, res, next) => {
    productController.rateProduct(req, res, next)
});

//url: localhost:4100/api/products/filter?minPrice=10&maxPrice=20&category=Category1
productRouter.get(
    '/filter',
    (req, res) => {
        productController.filterProducts(req, res)
    }
);

productRouter.get('/', (req, res) => {
    productController.getAllProducts(req, res)
});

productRouter.get("/averagePrice", (req, res, next) => {
    productController.averagePrice(req, res)
});

productRouter.get('/:id', (req, res) => {
    productController.getOneProduct(req, res)
});

productRouter.post(
    '/',
    upload.single('imageUrl'),
    (req, res) => {
        productController.addProduct(req, res)
    }
);

export default productRouter;