import { useSearchParams } from 'react-router-dom';

import CartContext from '../context/CartContext';

import '../styles/pages/PaymentResult.css';
import { useContext, useEffect } from 'react';

const PaymentResult = () => {
    const {emptyCart,cartKey} = useContext(CartContext);
    const [searchParams] = useSearchParams();
    const status = searchParams.get('status');


    useEffect(() => {
        if (status === 'success') {
            emptyCart();
        }
        
    }, [cartKey]);

    const getMessage = () => {
        switch (status) {
            case 'success':
                return { title: '¡Pago exitoso!', message: 'Gracias por tu compra ', type: 'success' };
            case 'failure':
                return { title: 'Pago rechazado', message: 'Hubo un problema con tu pago ', type: 'failure' };
            case 'pending':
                return { title: 'Pago pendiente', message: 'Tu pago está en proceso ', type: 'pending' };
            default:
                return { title: 'Estado desconocido', message: 'No se pudo verificar el estado del pago.', type: 'unknown' };
        }
    };

    const { title, message, type } = getMessage();

    return (
        <main className="paymentResult">
            <div className={`payment-result-container ${type}`}>
                <div className="payment-card">
                    <h2>{title}</h2>
                    <p>{message}</p>
                    <a href="/" className="payment-home-link">Volver al inicio</a>
                </div>
            </div>
        </main>
    );
};

export default PaymentResult;
