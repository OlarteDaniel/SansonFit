import ProductRepository from "../repositories/ProductRepository.js";
import ProductDAO from "../db/mongo/ProductDAO.js";

import CategoryRepository from "../repositories/CategoryRepository.js";
import CategoryDAO from "../db/mongo/CategoryDAO.js";

export const productService = new ProductRepository(new ProductDAO());
export const categoryService = new CategoryRepository(new CategoryDAO());