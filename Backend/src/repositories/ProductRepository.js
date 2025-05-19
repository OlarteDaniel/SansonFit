export default class ProductRepository{

    constructor(dao){
        this.dao = dao;
    }

    countProductsByCategory(categoryId){
        return this.dao.count({category:categoryId});
    }

    getProducts(page,limit,sortField,sortOrder,minPrice,maxPrice,filters){
        const query = {
            price: { $gte: minPrice, $lte: maxPrice }
        };

        if (filters && filters.length > 0) {
            query.category = { $in: filters };
        }

        return this.dao.get(query, {
            page: page,
            limit: limit,
            sort: { 
                globalStatus: -1,
                [sortField]: sortOrder
            }
        });
    }

    getCountActive(){
        return this.dao.getCountActive()
    }

    getProductsById(id){
        return this.dao.getOne({_id:id});
    }

    getProductByCode(code){
        return this.dao.getOne({code:code});
    }

    async getPriceRange() {
        const min = await this.dao.getMinPrice(); // <- fijate que acá el método en DAO se llama getMinPrice
        const max = await this.dao.getMaxPriceProduct();
        return { min, max };
    }

    createProduct(product){
        return this.dao.create(product);
    }

    updateProduct(id,product){
        return this.dao.update(id,product);
    }

    deleteProduct(id){
        return this.dao.delete({_id:id});
    }

}