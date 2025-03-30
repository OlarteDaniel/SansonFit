import BaseRouter from "./BaseRouter.js";

import imagesController from "../controllers/images.controller.js";

import upload from "../service/uploadService.js";

class ImagesRouter extends BaseRouter{

    init(){

        this.put('/:id/add/image',['ADMIN'],upload.array('thumbnails',3),imagesController.addImage)

        this.put('/:id',['ADMIN'],imagesController.updateImage);

        this.delete('/:id/:fileId',['ADMIN'],imagesController.deleteImage)
    }

}

const imagesRouter = new ImagesRouter();

export default imagesRouter.getRouter();