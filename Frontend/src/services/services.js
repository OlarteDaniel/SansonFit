import AxiosClient from "./AxiosClient.js";

import SessionsService from "./SessionsService.js";
import ProductsService from "./ProductsService.js";

export const sessionsService = new SessionsService(new AxiosClient());
export const productsService = new ProductsService(new AxiosClient());