import BaseRouter from "./BaseRouter.js";

import supplementVariantController from "../controllers/supplementVariant.controller.js";


class SupplementsVariantsRouter extends BaseRouter{

    init(){
        
        this.get('/',['PUBLIC'],supplementVariantController.getAll);

        this.get('/:flavor',['PUBLIC'],supplementVariantController.getAllByFlavor);
        
        this.post('/:id',['ADMIN'],supplementVariantController.addFlavor);

        this.put('/:id',['ADMIN'],supplementVariantController.updateFlavor);

        this.delete('/:id',['ADMIN'],supplementVariantController.deleteFlavor);
    }

}

const supplementsVariantsRouter = new SupplementsVariantsRouter();

export default supplementsVariantsRouter.getRouter();