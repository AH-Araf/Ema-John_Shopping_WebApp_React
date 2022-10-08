import React, { useEffect, useState } from 'react';
import { addToDb, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'

const Shop = () => {
    const [products, setProducts] = useState([]);


    useEffect(() => {
        fetch('products.json')
        .then(res => res.json())
        .then( data =>  setProducts(data))
    } , [])

    //for adding local host
    useEffect(() =>{
        const storedCart = getStoredCart();
        const savedCart = [];
        for (const id in storedCart){
            const addedProduct = products.find(product => product.id === id);
            if(addedProduct){
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                savedCart.push(addedProduct);
            }
            
        }
        setCart(savedCart);
        
    }, [products])


    //adding new items in cart
    const [cart, setCart] = useState([]);

    //adding new items in cart
    const handleAddToCart = (selectedProduct) =>{
        let newCart = [];
        const exists = cart.find(product => product.id === selectedProduct.id);
        if(!exists){
            selectedProduct.quantity = 1;
            // cart.push(product);
            newCart = [...cart, selectedProduct];
        }

        else{
            const rest = cart.filter(product => product.id !== selectedProduct.id);
            exists.quantity = exists.quantity + 1;
            newCart = [...rest, exists];
        }
        
        
        setCart(newCart);
        addToDb(selectedProduct.id);
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
