import mongoose from 'mongoose';
import {productService,categoryService} from '../service/service.js'
import cloudinary from '../utils/cloudinary.js';
import {promises as fsPromises} from 'fs'

const addImage = async (req, res) => {
    try {
        const pid = req.params.id;
        const allIndexes = [0, 1, 2]; // Índices posibles

        if (!mongoose.isValidObjectId(pid)) {
            return res.sendBadRequest('Invalid ID format');
        }

        const product = await productService.getProductsById(pid);
        if (!product) {
            req.logger.info(`There is no product with this ID`);
            return res.sendNotFound('Product not found'); // ⬅️ Se agregó `return` para cortar ejecución
        }
        req.logger.info('Product obtained successfully');

        const resultCategory = await categoryService.getCategoryById(product.category);
        if(!resultCategory){
            return res.sendBadRequest('Category not found');
        }

        if (!req.files || req.files.length === 0) { 
            return res.sendBadRequest('No images uploaded'); // ⬅️ Validación si no se subieron archivos
        }

        const thumbnails = product.thumbnails || [];
        const existingIndexes = thumbnails.map(file => Number(file.fileId.slice(-1))); // Índices usados
        const availableIndexes = allIndexes.filter(index => !existingIndexes.includes(index)); // Índices disponibles

        if (availableIndexes.length === 0) {
            return res.sendBadRequest('Maximum number of images reached (3)'); // ⬅️ Evitar subir más de 3 imágenes
        }

        const folder = `Sanson Fit/${resultCategory.type}/${resultCategory.name}`;
        const productCode = product.code; // ⬅️ Definir `code` correctamente

        const uploadedImages = await Promise.all(
            req.files.slice(0, availableIndexes.length).map((file, i) => 
                cloudinary.uploader.upload(file.path, {
                    public_id: `${productCode}-image-${availableIndexes[i]}`, // ⬅️ Ahora usa el índice correcto
                    folder: folder
                })
            )
        );

        // Agregar imágenes al producto
        const newThumbnails = uploadedImages.map((image, i) => ({
            mimeType: req.files[i].mimetype,
            url: image.secure_url,
            main: existingIndexes.length === 0 && i === 0, // ⬅️ La primera imagen agregada será `main`
            fileId: `${productCode}-image-${availableIndexes[i]}`
        }));

        thumbnails.push(...newThumbnails);

        // Eliminar archivos temporales
        await Promise.all(req.files.map(file => fsPromises.unlink(file.path)));
        req.logger.info('Temporary files deleted');

        // Actualizar producto
        const updatedProduct = await productService.updateProduct(pid, { thumbnails });
        if (!updatedProduct) {
            return res.sendBadRequest('Could not update product');
        }

        req.logger.info('Product updated successfully');
        return res.sendSuccessWithPayload(updatedProduct);

    } catch (error) {
        req.logger.error(`Error uploading images: ${error}`);
        return res.sendBadRequest('Failed to upload images to Cloudinary');
    }
};

const updateImage = async(req,res) =>{
    try {
        const pid = req.params.id;
        const {thumbnails} = req.body;

        if(!mongoose.isValidObjectId(pid)){
            return res.sendBadRequest('Invalid ID format');
        }

        const product = await productService.getProductsById(pid);
        if(!product){
            req.logger.info(`There is no product with this id`);
            res.sendNotFound('Product not found');
        }
        req.logger.info('Product obtained successfully');

        if(!thumbnails){
            return res.sendBadRequest('Information missing');
        }

        const updateFields = { thumbnails };

        const updatedProduct = await productService.updateProduct(pid,updateFields);
        if(!updatedProduct){
            return res.sendBadRequest('Could not update product');
        }

        req.logger.info('Product updated successfully');
        return res.sendSuccessWithPayload(updatedProduct);
    } catch (error) {
        req.logger.error(`Error getting product: ${error}`);
        return res.sendServerError('An error occurred while fetching product.');
    }

}

const deleteImage = async (req, res) => {
    const { id, fileId } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        return res.sendBadRequest('Invalid ID format');
    }

    try {
        // Buscar el producto por ID
        const product = await productService.getProductsById(id);
        if (!product) {
            req.logger?.info(`Product not found for ID: ${id}`);
            return res.sendNotFound('Product not found');
        }

        // Buscar la imagen a eliminar
        const imageToDelete = product.thumbnails.find(file => file.fileId === fileId);
        if (!imageToDelete) {
            return res.sendNotFound('Image not found');
        }

        // Buscar la categoría del producto
        const category = await categoryService.getCategoryById(product.category);
        if (!category) {
            return res.sendNotFound('Category not found');
        }

        // // Eliminar la imagen del array `thumbnails`

        const updatedThumbnails = product.thumbnails.filter((file) => file.fileId !== fileId);
        if (!updatedThumbnails.some(file => file.main) && updatedThumbnails.length > 0) {
            updatedThumbnails[0].main = true;
        }

        // Construir `publicId` de la imagen en Cloudinary
        const publicId = `Sanson Fit/${category.type}/${category.name}/${fileId}`;
        
        const cloudinaryResponse = await cloudinary.uploader.destroy(publicId);
        if (cloudinaryResponse.result !== 'ok') {
            return res.sendBadRequest('Failed to delete the image from Cloudinary');
        }

        // // Actualizar el producto con la nueva lista de imágenes
        const updatedProduct = await productService.updateProduct(id, { thumbnails: updatedThumbnails || [] });
        if (!updatedProduct) {
            return res.sendBadRequest('Could not update product');
        }

        res.sendSuccess('Image deleted successfully');
    } catch (error) {
        req.logger.error(`Error deleting Image: ${error}`);
        return res.sendServerError('An error occurred while deleting the image');
    }
};


export default{
    addImage,
    updateImage,
    deleteImage
}