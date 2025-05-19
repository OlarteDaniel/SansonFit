import { useContext, useMemo } from 'react'

import UserContext from '../../context/UserContext';
import ProductContext from '../../context/ProductContext';

import '../../styles/components/products/ProductPaginate.css'

const ProductPaginate = () => {

    const { session } = useContext(UserContext);
    const { activeQuantity,paginate, fetchProducts, products } = useContext(ProductContext);
    const userRole = session?.data?.payload?.role;

    // ⚡ Nuevo cálculo de total de páginas
    const totalPages = useMemo(() => {
        // Si el usuario tiene rol 'admin', se le muestra todas las páginas de productos
        if (userRole === 'admin') {
            return paginate.totalPages; // admin ve todas las páginas normales
        } else {
            // Si el usuario NO es 'admin', se filtran los productos habilitados
            const itemsPerPage = paginate.limit || 8; // Asumimos 8 por página si no hay limit
            // Calcula cuántas páginas son necesarias para mostrar los productos habilitados
            // Math.ceil() se usa para redondear hacia arriba, porque aunque haya un solo producto en la última página. 
            return Math.ceil(activeQuantity.count / itemsPerPage);
        }
        
    }, [userRole, paginate, products.length]); // Se vuelve a calcular solo si cambia el rol, la paginación o la cantidad de productos habilitados

    return (
        <ul className="pagination">
            {Array.from({ length: totalPages }, (_, i) => (
                <li key={i} onClick={() => fetchProducts(i + 1)}>
                    {i + 1}
                </li>
            ))}
        </ul>
    );
}

export default ProductPaginate;
