import mongoose from "mongoose";
import { categoryService } from "../service/service.js";

const getAll = async (req, res) => {
    try {
        const categories = await categoryService.getCategories();

        if (categories.length === 0) {
            return res.sendNotFound('There are no registered categories');
        }

        req.logger.info('Categories fetched successfully');
        return res.sendSuccessWithPayload(categories);
    } catch (error) {
        req.logger.warning('There was an error getting the categories:', error);
        return res.sendServerError('An unexpected error occurred');
    }
};

const getOne = async (req, res) => {
    try {
        const cid = req.params.id;
        const category = await categoryService.getCategoryById(cid);

        if (!category) {
            return res.sendNotFound('Category not found');
        }
        req.logger.info(`Categoría recuperada exitosamente`);
        return res.sendSuccessWithPayload(category);
    } catch (error) {
        req.logger.error('Error fetching category:', error);
        return res.sendServerError('An unexpected error occurred');
    }
};

const getOneByNameAndType = async (req, res) => {
    try {
        const { type, name } = req.params;
        if (!type || !name) {
            return res.sendBadRequest('Information missing');
        }

        const category = await categoryService.getCategoriesByTypeAndName(type, name);
        if (!category) {
            return res.sendNotFound('Category not found');
        }

        req.logger.info(`Categoría recuperada exitosamente`);
        return res.sendSuccessWithPayload(category);
    } catch (error) {
        req.logger.error('Error fetching category by name and type:', error);
        return res.sendServerError('An unexpected error occurred');
    }
};

const create = async (req, res) => {
    try {
        const {name, type} = req.body;
        if (!name) {
            return res.sendBadRequest('Information missing');
        }

        const newCategory = { name, type };
        const result = await categoryService.createCategory(newCategory);

        if (!result) {
            return res.sendBadRequest('Could not create category');
        }

        req.logger.info(`Category created successfully: ${name}`);
        return res.sendCreated('Category created',result);
    } catch (error) {
        req.logger.error('Error creating category:', error);
        return res.sendServerError('An unexpected error occurred');
    }
};

const update = async (req, res) => {
    try {
        const cid = req.params.id;
        const { name } = req.body;

        const category = await categoryService.getCategoryById(cid);
        if (!category) {
            return res.sendNotFound('Category not found');
        }

        if (!name) {
            return res.sendBadRequest('Information missing');
        }

        const updateCategory = { name };
        const result = await categoryService.updateCategory(cid, updateCategory);

        if (!result) {
            return res.sendBadRequest('Could not update category');
        }

        return res.sendSuccess('Category updated');
    } catch (error) {
        req.logger.error('Error updating category:', error);
        return res.sendServerError('An unexpected error occurred');
    }
};

const eliminate = async (req, res) => {
    try {
        const cid = req.params.id;

        if (!mongoose.isValidObjectId(cid)) {
            return res.sendBadRequest('Invalid ID format');
        }

        const category = await categoryService.getCategoryById(cid);
        if (!category) {
            return res.sendNotFound('Category not found');
        }

        const result = await categoryService.deleteCategory(cid);

        if (!result) {
            return res.sendBadRequest('Could not delete category');
        }

        req.logger.info(`Category '${category.name}' deleted successfully`);
        return res.sendSuccess('Category deleted');
    } catch (error) {
        req.logger.error('Error deleting category:', error);
        return res.sendServerError('An unexpected error occurred');
    }
};

export default {
    getAll,
    getOne,
    getOneByNameAndType,
    create,
    update,
    eliminate
};
