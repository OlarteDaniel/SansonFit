import BaseRouter from "./BaseRouter.js";

import productsController from "../controllers/products.controller.js";
// import apparelController from "../controllers/apparel.controller.js";

import upload from "../service/uploadService.js";

class ProductsRouter extends BaseRouter{

    init(){

        this.get('/',['PUBLIC'],productsController.getAll);

        this.get('/:id',['PUBLIC'],productsController.getOneById);

        this.post('/',['ADMIN'],upload.array('thumbnails',3),productsController.createProduct);

        this.put('/:id',['ADMIN'],productsController.updateProduct);

        this.delete('/:id',['ADMIN'],productsController.eliminate);

        
        // this.get('/supplements/',['PUBLIC'],supplementVariantController.getAll);

        // this.get('/supplements/:flavor',['PUBLIC'],supplementVariantController.getAllByFlavor);
        
        // this.post('/supplements/:id',['ADMIN'],supplementVariantController.addFlavor);

        // this.put('/supplements/:id',['ADMIN'],supplementVariantController.updateFlavor);

        // this.delete('/supplements/:id',['ADMIN'],supplementVariantController.deleteFlavor);


        // this.get('/:code',['PUBLIC'],productsController.getOneByCode);

        // this.get('/apparel/:size',['PUBLIC'],apparelController.getAllBySize);

        // this.post('/apparel',['ADMIN'],upload.array('thumbnails',3),apparelController.createApparel);

        // this.put('/apparel/:id',['ADMIN'],apparelController.updateApparel);
    }

}

const productsRouter = new ProductsRouter();

export default productsRouter.getRouter();