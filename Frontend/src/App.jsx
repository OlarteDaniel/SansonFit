import {BrowserRouter, Route, Routes, useLocation} from 'react-router-dom';
import { useEffect } from 'react';

import Wrapper from './hocs/Wrapper';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductsList from './pages/ProductsList';

import './App.css'

function App() {
  return (
    <div className="app">
        <BrowserRouter>
          <Wrapper>
            <NavBar/>
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/products' element={<ProductsList/>}/>
            </Routes>
            <Footer/>
          </Wrapper>
        </BrowserRouter>
    </div>
  );
}

export default App
