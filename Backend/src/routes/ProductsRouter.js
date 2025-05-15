import BaseRouter from "./BaseRouter.js";

import productsController from "../controllers/products.controller.js";
// import apparelController from "../controllers/apparel.controller.js";

import upload from "../service/uploadService.js";

class ProductsRouter extends BaseRouter{

    init(){

        this.get('/',['PUBLIC'],productsController.getAll);

        this.get('/price-range',['PUBLIC'],productsController.getMinMaxPrices);

        this.get('/:type/:name',['PUBLIC'],productsController.getAllByCategory);

        this.get('/:id',['PUBLIC'],productsController.getOneById);

        this.post('/',['ADMIN'],upload.array('thumbnails',3),productsController.createProduct);

        this.put('/:id',['ADMIN'],productsController.updateProduct);

        this.delete('/:id',['ADMIN'],productsController.eliminate);
    }

}

const productsRouter = new ProductsRouter();

export default productsRouter.getRouter();