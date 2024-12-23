import {BrowserRouter, Route, Routes} from 'react-router-dom';

import NavBar from './components/NavBar';
import Home from './pages/Home';
import ProductsList from './pages/ProductsList';

import './App.css'

function App() {

  return (
    <div className="app">
        <BrowserRouter>
          <NavBar/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/products' element={<ProductsList/>}/>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App
