import BaseRouter from "./BaseRouter.js";

import productsController from "../controllers/products.controller.js";
import supplementController from "../controllers/supplement.controller.js";
import apparelController from "../controllers/apparel.controller.js";

import upload from "../service/uploadService.js";

class ProductsRouter extends BaseRouter{

    init(){

        this.get('/',['PUBLIC'],productsController.getAll);

        this.get('/:id',['PUBLIC'],productsController.getOne);

        this.get('/supplements/:flavor',['PUBLIC'],supplementController.getAllByFlavor);

        this.post('/apparel',['ADMIN'],upload.array('thumbnails',3),apparelController.createApparel);

        this.post('/supplements',['ADMIN'],upload.array('thumbnails',3),supplementController.createSupplement);

        this.put('/apparel/:id',['ADMIN'],apparelController.updateApparel);
        
        this.put('/supplements/:id',['ADMIN'],supplementController.updateSuppllement);

        this.delete('/:id',['ADMIN'],productsController.eliminate);
    }

}

const productsRouter = new ProductsRouter();

export default productsRouter.getRouter();