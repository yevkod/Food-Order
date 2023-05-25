import React, { useContext, useState } from 'react';
import s from './Cart.module.css';
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';


const Cart = (props) => {
    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);
    const cartCtx = useContext(CartContext);

    console.log("cartCtx.items", cartCtx.items)

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id);
    }

    const cartItemAddHandler = (item) => {
        cartCtx.addItem({ ...item, amount: 1 })
    }

    const orderHandler = () => {
        setIsCheckout(true);
    }

    const submitOrderHandler = async (userData) => {
        setIsSubmitting(true);
        await fetch("https://meals-7ba2a-default-rtdb.firebaseio.com/orders.json", {
            method: "POST",
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items
            })
        })
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
    }

    const cartItems = (
        <ul className={s['cart-items']}>
            {
                cartCtx.items.map((item) => (
                    <CartItem key={item.id} name={item.name} amount={item.amount} price={item.price}
                        onRemove={cartItemRemoveHandler.bind(null, item.id)}
                        onAdd={cartItemAddHandler.bind(null, item)}
                    />
                ))}
        </ul>
    )

    const modalActions = (
        <div className={s.actions}>
            <button className={s['button-alt']} onClick={props.onClose}>Close</button>
            {hasItems && <button className={s.button} onClick={orderHandler}>Order</button>}
        </div>
    );

    const cartModalContent = (
        <React.Fragment>
            {cartItems}
            <div className={s.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />}
            {!isCheckout && modalActions}
        </React.Fragment>
    )

    const isSubmittingModalContent = <p>Sending order data...</p>;

    const didSubmitModalContent = (
        <React.Fragment>
            <p>Succesfully sent the order!</p>
            <div className={s.actions}>
            <button className={s.button} onClick={props.onClose}>Close</button>
        </div>
        </React.Fragment>
    )

    return (
        <Modal onClose={props.onClose}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && isSubmittingModalContent}
            {!isSubmitting && didSubmit && didSubmitModalContent}
        </Modal>
    )
}

export default Cart