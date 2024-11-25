import ProductRepository from "../repositories/ProductRepository.js";
import ProductDAO from "../db/mongo/ProductDAO.js";

export const productService = new ProductRepository(new ProductDAO());
