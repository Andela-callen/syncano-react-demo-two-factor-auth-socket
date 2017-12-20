import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'react-proptypes';
import { loginAction } from '../../actions/authActions';
import { alertClear } from '../../actions/alertActions';
import { validateRequired } from '../../utils/helpers';
import AuthComponent from '../AuthComponent';

/**
 * LoginPage class declaration
 * @class LoginPage
 * @extends {React.Component}
 */
export class LoginPage extends Component {
  state = {
    errors: {}
  };

  /**
   * Check form fields valid
   * @param {object} userCredentials
   * @returns {boolean} result
   */
  isValid({ username, password }) {
    const checkRequired = validateRequired({ username, password });
    if (checkRequired.passes === false) {
      this.setState({ errors: checkRequired.validateMessages });
    }
    return checkRequired.passes;
  }

  /**
   * Handle form submit
   * @param {object} userCredentials
   * @return {void} void
   */
  handleSubmit = (userCredentials) => {
    if (this.isValid(userCredentials)) {
      this.setState({ errors: {} });
      this.props.loginAction(userCredentials, this.props.history);
    }
  };

  /**
   * on close of alert
   * @return {void} void
   */
  onAlertClose = () => {
    this.props.alertClear();
  };

  /**
   * Renders component
   * @return {XML} JSX
   */
  render() {
    return (
      <AuthComponent
        alertState={ this.props.alertState }
        authType= 'login'
        authSubmit={ this.handleSubmit }
        onAlertClose={this.onAlertClose}
        authState={ this.props.loginState}
        authErrors={ this.state.errors }
      />
    );
  }
}

LoginPage.propTypes = {
  alertState: PropTypes.object.isRequired,
  loginState: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  loginAction: PropTypes.func.isRequired,
  alertClear: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  alertState: state.alertReducer,
  loginState: state.loginReducer
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ loginAction, alertClear }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
