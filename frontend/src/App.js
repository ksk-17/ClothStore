import './App.css';
import Header from './Components/Header/Header';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Home from './Screens/Home/Home';
import Login from './Screens/Login/Login';
import Register from './Screens/Register/Register';
import Footer from './Components/Footer/Footer';
import Shop from './Screens/Shop/Shop';
import Product from './Screens/Product/Product';
import ManageUsers from './Screens/ManageUsers/ManageUsers';
import ManageProducts from './Screens/ManageProducts/ManageProducts';
import CreateProduct from './Screens/CreateProduct/CreateProduct';
import EditProduct from './Screens/EditProduct/EditProduct';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <div className="body">
          <Routes>
              <Route path='/' element={<Home />} exact />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/shop' element={<Shop />} />
              <Route path='/shop/:id' element={<Product />} />
              <Route path='/manage/users' element={<ManageUsers />} />
              <Route path='/manage/products' element={<ManageProducts />} />
              <Route path='/manage/products/add' element={<CreateProduct />} />
              <Route path='/manage/product/:id' element={<EditProduct />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;