import React from 'react';

import Aux from '../../../hoc/Auxiliary/Auxiliary'
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {
    const IngredientSummary = Object.keys(props.ingredients)
        .map((igKey) => {
            return <li key={igKey}>
                <span>{igKey} : </span>{props.ingredients[igKey]}
            </li>;
        });
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious Burger with the following ingredients:</p>
            <ul>
                {IngredientSummary}
            </ul>
            <p><strong>Total Price : {props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={props.purchaseCancelled}>Cancel</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>Continue</Button>

        </Aux>
    )

}

export default OrderSummary
