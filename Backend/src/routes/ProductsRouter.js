import BaseRouter from "./BaseRouter.js";

import productsController from "../controllers/products.controller.js";

import upload from "../service/uploadService.js";

class ProductsRouter extends BaseRouter{

    init(){

        this.get('/',productsController.getAll);

        this.get('/:id',productsController.getOne);

        this.post('/',upload.array('thumbnails',3),productsController.create);

        this.put('/:id',productsController.update);

        this.delete('/:id',productsController.eliminate);
    }

}

const productsRouter = new ProductsRouter();

export default productsRouter.getRouter();