import {BrowserRouter, Route, Routes} from 'react-router-dom';

import {UserContextProvider} from './context/UserContext'
import { ProductContextProvider } from './context/ProductContext';
import { CartContextProvider } from './context/CartContext';

import Wrapper from './hocs/Wrapper';

import NavBar from './components/NavBar';
import Cart from './components/cart/Cart';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductsList from './pages/ProductsList';
import Login from './pages/Login';
import Register from './pages/Register';
import RegisterProduct from './pages/RegisterProduct';
import ProductDetails from './pages/ProductDetails';
import ProductEdit from './pages/ProductEdit';
import ProtectedRoute from './components/protective/ProtectedRoute';

import './App.css'


function App() {

  return (
    <div className="app">
        <BrowserRouter>
          <UserContextProvider>
            <ProductContextProvider>
              <CartContextProvider>
                <Wrapper>
                  <NavBar/>
                  <Cart/>
                  <Routes>
                    <Route path='/' element={<Home/>}/>

                    <Route path='/products' element={<ProductsList/>}/>

                    <Route path='/login' element={<Login/>}/>

                    <Route path='/register' element={<Register/>}/>

                    <Route element={<ProtectedRoute/>}>
                        <Route path='/register/product' element={<RegisterProduct/>}/>
                        <Route path='/product/modify/:id' element={<ProductEdit/>} />
                    </Route>

                    <Route path='/product/detail/:id' element={<ProductDetails/>}/>
        
                  </Routes>
                  <Footer/>
                </Wrapper>
              </CartContextProvider>
            </ProductContextProvider>
          </UserContextProvider>
        </BrowserRouter>
    </div>
  );
}

export default App
