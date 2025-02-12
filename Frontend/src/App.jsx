import {BrowserRouter, Route, Routes, useLocation} from 'react-router-dom';

import {UserContextProvider} from './context/UserContext'
import Wrapper from './hocs/Wrapper';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductsList from './pages/ProductsList';
import Login from './pages/Login';
import Register from './pages/Register';

import './App.css'


function App() {

  return (
    <div className="app">
        <BrowserRouter>
          <UserContextProvider>
            <Wrapper>
              <NavBar/>
              <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/products' element={<ProductsList/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
              </Routes>
              <Footer/>
            </Wrapper>
            </UserContextProvider>
        </BrowserRouter>
    </div>
  );
}

export default App
