import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'

import asyncComponent from './hoc/asyncComponent/asyncComponent'
import Auth from './containers/Auth/Auth'
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
// import Checkout from './containers/Checkout/Checkout';
// import Orders from './containers/Orders/Orders';
import Logout from './containers/Auth/Logout/Logout';
import { authCheckState } from './store/actions/auth-action';

const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout');
})

const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders');
})

export class App extends Component {

  // state = {
  //   show: true
  // }

  // componentDidMount() {
  //   setTimeout(() => {
  //     this.setState({ show: false })
  //   }, 5000);
  // }

  componentDidMount() {
    this.props.onTryAutoSignUp()
  }

  render() {

    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    )

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={Auth} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      )
    }

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null
})

const mapDispatchToProps = dispatch => ({
  onTryAutoSignUp: () => dispatch(authCheckState())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
