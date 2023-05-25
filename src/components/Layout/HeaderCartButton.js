import React, { useContext, useEffect, useState } from 'react';
import CartIcon from '../Cart/CartIcon';
import s from './HeaderCartButton.module.css';
import CartContext from '../../store/cart-context';

const HeaderCartButton = (props) => {
    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

    const cartCtx = useContext(CartContext);

    const {items} = cartCtx;

    const numberOfCartItems = items.reduce((curNumber, item) => {
        return curNumber + item.amount;
    }, 0);


    const btnClasses = `${s.button} ${btnIsHighlighted ? s.bump : ''}`;

    useEffect(() => {
        if (items.length === 0) {
            return;
        }
        setBtnIsHighlighted(true);

        const timer = setTimeout(() => {
            setBtnIsHighlighted(false);
        }, 300)

        return () => {
            clearTimeout(timer)
        }
    }, [items]);

    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={s.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={s.badge}>
                {numberOfCartItems}
            </span>
        </button>
    )
}

export default HeaderCartButton;

