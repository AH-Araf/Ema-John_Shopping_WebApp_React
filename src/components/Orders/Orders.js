import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { removeFromDb } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Reviewitem from '../Reviewitem/Reviewitem';

const Orders = () => {
    const {products, initialCart} = useLoaderData();
    const [cart, setCart] = useState(initialCart)


    //remove from orders carts
    const handleRemoveItem = (id) => {
        const remaining = cart.filter(product => product.id !== id);
        setCart(remaining);
        removeFromDb(id);
    }



    return (
        <div className='shop-container'>
            <div className="orders-container">
                {
                    cart.map(product => <Reviewitem
                        key={product.id}
                        product={product}
                        handleRemoveItem = {handleRemoveItem}
                    ></Reviewitem>)
                }
            </div>


            <div className='cart-container'>
                <Cart cart={cart}></Cart>
            </div> 
        </div>
    );
};

export default Orders;