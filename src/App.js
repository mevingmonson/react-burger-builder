import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router-dom'

import Auth from './containers/Auth/Auth'
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Logout from './containers/Auth/Logout/Logout';
import { authCheckState } from './store/actions/auth-action';


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
    return (
      <div>
        <Layout>
          {/* {this.state.show ? <BurgerBuilder /> : null} */}
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/auth" component={Auth} />
            <Route path="/logout" component={Logout} />
            <Route path="/" exact component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  onTryAutoSignUp: () => dispatch(authCheckState())
})

export default withRouter(connect(null, mapDispatchToProps)(App))
