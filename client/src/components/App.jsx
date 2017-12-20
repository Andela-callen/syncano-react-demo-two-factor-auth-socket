import React, { Component } from 'react';
import { Switch, HashRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'react-proptypes';
import { alertClear } from '../actions/alertActions';
import { logoutAction } from '../actions/authActions';
import Header from '../components/Header';
import { HomePage, LoginPage, RegisterPage, UserHomePage, SetUpTwoFactorPage, DisableTwoFactorPage } from './Page';
import customHistory from '../utils/history';
import PrivateRoute from '../routes/PrivateRoute';
import PublicRoute from '../routes/PublicRoute';

/**
 * App class declaration
 * @class App
 * @extends {React.Component}
 */
class App extends Component {
  /**
   * Component constructor
   * @param {object} props
   * @memberOf App
   */
  constructor(props) {
    super(props);

    customHistory.listen(() => {
      this.props.alertClear();
    });
  }

  /**
   * on click of logout link
   * @param {object} history
   * @return {void} void
   */
  handleLogout = (history) => {
    this.props.logoutAction(history);
  };

  /**
   * Renders component
   * @return {XML} JSX
   */
  render() {
    return (
      <div className="container">
        <HashRouter>
          <div>
            <Header
              handleLogout={this.handleLogout}
            />
            <Switch>
              <PublicRoute exact path='/' component={HomePage}/>
              <PrivateRoute exact path='/dashboard' component={UserHomePage}/>
              <PublicRoute exact path='/login' component={LoginPage}/>
              <PublicRoute exact path='/register' component={RegisterPage}/>
              <PrivateRoute exact path='/two-factor-setup' component={SetUpTwoFactorPage}/>
              <PrivateRoute exact path='/two-factor-disable' component={DisableTwoFactorPage}/>
              <PublicRoute path="*" component={HomePage}/>
            </Switch>
          </div>
        </HashRouter>
      </div>
    );
  }
}

App.propTypes = {
  alertClear: PropTypes.func.isRequired,
  logoutAction: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ alertClear, logoutAction }, dispatch);

export default connect(null, mapDispatchToProps)(App);
