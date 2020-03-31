import React, { Component } from 'react';

import Aux from '../../hoc/auxilary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

export class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchaseable: false,
        purchasing: false
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            }).reduce(((sum, el) => {
                return sum + el;
            }), 0);
        this.setState({ purchaseable: sum > 0 });
    }

    addIngredientHandler = (type) => {
        let OldIngredientCount = this.state.ingredients[type];
        let newIngredientCount = OldIngredientCount + 1;
        let updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = newIngredientCount;
        let oldPrice = this.state.totalPrice;
        let newPrice = oldPrice + INGREDIENT_PRICES[type];
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        let OldIngredientCount = this.state.ingredients[type];
        if (OldIngredientCount <= 0) {
            return;
        }
        let newIngredientCount = OldIngredientCount - 1;
        let updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = newIngredientCount;
        let oldPrice = this.state.totalPrice;
        let newPrice = oldPrice - INGREDIENT_PRICES[type];
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        console.log(this.state)
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary ingredients={this.state.ingredients} />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    addIngredient={this.addIngredientHandler}
                    removeIngredient={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchaseable={this.state.purchaseable}
                    ordered={this.purchaseHandler} />
            </Aux>
        )
    }
}

export default BurgerBuilder
