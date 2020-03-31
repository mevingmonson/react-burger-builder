import React from 'react';

import Aux from '../../../hoc/auxilary'

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
        </Aux>
    )

}

export default OrderSummary
