import { useEffect, useState } from 'react'
import ProductList from '../components/ProductList';
import { fetchAllProducts } from '../lib/apis';

const HomePage = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchAllProducts()
            .then((res) => {
                setProducts(() => res.data);
            })
            .catch((err) => console.log(err));
    }, []);


    return (
        <div>
            {products.length === 0 && <p>No Products Available</p>}
            {products.length > 0 && <ProductList products={products} />}
        </div>
    )
}

export default HomePage
