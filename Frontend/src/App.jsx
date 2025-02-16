import {BrowserRouter, Route, Routes} from 'react-router-dom';

import {UserContextProvider} from './context/UserContext'
import { ProductContextProvider } from './context/ProductContext';

import Wrapper from './hocs/Wrapper';

import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductsList from './pages/ProductsList';
import Login from './pages/Login';
import Register from './pages/Register';
import RegisterProduct from './pages/RegisterProduct';
import ProtectedRoute from './components/protective/ProtectedRoute';

import './App.css'


function App() {

  return (
    <div className="app">
        <BrowserRouter>
          <UserContextProvider>
            <ProductContextProvider>
                <Wrapper>
                  <NavBar/>
                  <Routes>
                    <Route path='/' element={<Home/>}/>

                    <Route path='/products' element={<ProductsList/>}/>

                    <Route path='/login' element={<Login/>}/>

                    <Route path='/register' element={<Register/>}/>

                    <Route element={<ProtectedRoute/>}>
                      <Route path='/register/product' element={<RegisterProduct/>}/>
                    </Route>

                  </Routes>
                  <Footer/>
                </Wrapper>
              </ProductContextProvider>
            </UserContextProvider>
        </BrowserRouter>
    </div>
  );
}

export default App
