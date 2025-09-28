import './App.css';
import { Routes, Route } from 'react-router';
import HomePage from './pages/HomePage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Cart from './pages/Cart';
import Layout from './components/Layout';
import ShowProduct from './pages/ShowProduct';

function App() {
    return <Layout>
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<SignIn />} />
            <Route path='/register' element={<SignUp />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/products/:productId' element={ <ShowProduct/> } />
        </Routes>
    </Layout>
}

export default App
