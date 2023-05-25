import React, { useRef, useState } from 'react';
import s from './Checkout.module.css';

const isEmpty = value => value.trim() === '';
const isFiveChars = value => value.trim().length === 5;

const Checkout = (props) => {
    const [formInputsValidity, setFormInputsValidity] = useState({
        name: true,
        street: true,
        city: true,
        postalCode: true
    })

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalCodeInputRef = useRef();
    const cityInputRef = useRef();

    const confirmHandler = (event) => {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostalCode = postalCodeInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredCityIsValid = !isEmpty(enteredCity);
        const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);

        setFormInputsValidity({
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            city: enteredCityIsValid,
            postalCode: enteredPostalCodeIsValid
        });

        const formIsValid =
            enteredNameIsValid &&
            enteredStreetIsValid &&
            enteredCityIsValid &&
            enteredPostalCodeIsValid;

        if (!formIsValid) {

        }

        props.onConfirm({
            name: enteredName,
            street: enteredCity,
            city: enteredCity,
            postalCode: enteredPostalCode
        });

    };

    const nameControlClasses = `${s.control} ${
        formInputsValidity.name ? '' : s.invalid
    }`;
    const streetControlClasses = `${s.control} ${
        formInputsValidity.street ? '' : s.invalid
    }`;
    const postalCodeControlClasses = `${s.control} ${
        formInputsValidity.postalCode ? '' : s.invalid
    }`;
    const cityControlClasses = `${s.control} ${
        formInputsValidity.city ? '' : s.invalid
    }`;

    return (
        <form className={s.form} onSubmit={confirmHandler}>
            <div className={nameControlClasses}>
                <label htmlFor='name'>Your Name</label>
                <input type='text' id='name' ref={nameInputRef} />
                {!formInputsValidity.name && <p>Please enter a valid name!</p>}
            </div>
            <div className={streetControlClasses}>
                <label htmlFor='street'>Street</label>
                <input type='text' id='street' ref={streetInputRef} />
                {!formInputsValidity.street && <p>Please enter a valid street!</p>}
            </div>
            <div className={postalCodeControlClasses}>
                <label htmlFor='postal'>Postal Code</label>
                <input type='text' id='postal' ref={postalCodeInputRef} />
                {!formInputsValidity.postalCode && <p>Please enter a valid postal code!</p>}
            </div>
            <div className={cityControlClasses}>
                <label htmlFor='city'>City</label>
                <input type='text' id='city' ref={cityInputRef} />
                {!formInputsValidity.city && <p>Please enter a valid city!</p>}
            </div>
            <div className={s.actions}>
                <button type='button' onClick={props.onCancel}>
                    Cancel
                </button>
                <button className={s.submit}>Confirm</button>
            </div>
        </form>
    );
};

export default Checkout;