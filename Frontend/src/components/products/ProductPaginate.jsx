import { useContext, useMemo } from 'react'

import UserContext from '../../context/UserContext';
import ProductContext from '../../context/ProductContext';

import '../../styles/components/products/ProductPaginate.css'

const ProductPaginate = () => {

    const { session } = useContext(UserContext);
    const { activeQuantity,paginate, fetchProducts, totalProducts } = useContext(ProductContext);
    const userRole = session?.data?.payload?.role;

    const itemsPerPage = paginate.limit || 8; // Asumimos 8 por página si no hay limit

    // ⚡ Nuevo cálculo de total de páginas
    const totalPages = useMemo(() => {
        // Si el usuario tiene rol 'admin', se le muestra todas las páginas de productos
        if (userRole === 'admin') {
            return paginate.totalPages; // admin ve todas las páginas normales
        } else {
            // Si el usuario NO es 'admin', se filtran los productos habilitados
            
            // Calcula cuántas páginas son necesarias para mostrar los productos habilitados
            // Math.ceil() se usa para redondear hacia arriba, porque aunque haya un solo producto en la última página. 

            return Math.ceil(activeQuantity.count / itemsPerPage);
        }
        
    }, [userRole, paginate, activeQuantity.count, itemsPerPage]); // Se vuelve a calcular solo si cambia el rol, la paginación o la cantidad de productos habilitados

    // 🧠 Mostrar paginación sólo si hay más de una página
    const shouldShowPagination = useMemo(() => {
        // No mostrar si los productos totales (tras filtro) son menores o iguales al límite
        if (totalProducts <= itemsPerPage) {
            return false;
        }
        return totalPages > 1;
    }, [totalProducts, itemsPerPage, totalPages]);

    if (!shouldShowPagination) return null;

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
