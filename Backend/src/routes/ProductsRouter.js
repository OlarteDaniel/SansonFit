import BaseRouter from "./BaseRouter.js";

import productsController from "../controllers/products.controller.js";

import upload from "../service/uploadService.js";

class ProductsRouter extends BaseRouter{

    init(){

        this.get('/',['PUBLIC'],productsController.getAll);

        this.get('/:id',['PUBLIC'],productsController.getOne);

        this.post('/',['ADMIN'],upload.array('thumbnails',3),productsController.create);

        this.put('/:id',['ADMIN'],productsController.update);

        this.delete('/:id',['ADMIN'],productsController.eliminate);
    }

}

const productsRouter = new ProductsRouter();

export default productsRouter.getRouter();