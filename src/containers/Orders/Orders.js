import React, { Component } from 'react';
import { connect } from 'react-redux'
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import Spinner from '../../components/UI/Spinner/Spinner'

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        const queryParams = `?auth=${this.props.token}&orderBy="userId"&equalTo="${this.props.userId}"`
        axios.get('/orders.json' + queryParams)
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                this.setState({ loading: false, orders: fetchedOrders });
            })
            .catch(error => {
                this.setState({ loading: false });
            });
    }
    render() {
        let orders = <Spinner />
        if (!this.state.loading) {
            orders = this.state.orders.map(order => (
                <Order key={order.id} ingredients={order.ingredients} price={+order.price} />
            ))
        }
        return (
            <div>
                {orders}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    token: state.auth.token,
    userId: state.auth.userId
})

export default connect(mapStateToProps)(withErrorHandler(Orders, axios));