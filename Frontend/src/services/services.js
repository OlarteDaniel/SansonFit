import AxiosClient from "./AxiosClient.js";

import SessionsService from "./SessionsService.js";
import ProductsService from "./ProductsService.js";
import CategoryService from './CategoryService.js';
import VariantService from './VariantService.js';

export const sessionsService = new SessionsService(new AxiosClient());
export const productsService = new ProductsService(new AxiosClient());
export const categoryService = new CategoryService(new AxiosClient());
export const variantService = new VariantService(new AxiosClient()); 