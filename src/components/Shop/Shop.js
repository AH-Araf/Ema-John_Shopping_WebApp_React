import React, { useEffect, useState } from 'react';
import { addToDb } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'

const Shop = () => {
    const [products, setProducts] = useState([]);

    //adding new items in cart
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch('products.json')
        .then(res => res.json())
        .then( data => setProducts(data))
    } , [])

    //adding new items in cart
    const handleAddToCart = (product) =>{
        // cart.push(product);
        const newCart = [...cart, product];
        setCart(newCart);
        addToDb(product.id);
    }

    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product => <Product 
                        key={product.id}
                        product={product}
                        //send addToCart as a props for adding
                        handleAddToCart = {handleAddToCart}
                        ></Product>)
                }
            </div>


            <div className='cart-container'>
                <Cart cart={cart}></Cart>
            </div> 
        </div>
    );
};

export default Shop;