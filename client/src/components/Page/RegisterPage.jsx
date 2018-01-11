import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'react-proptypes';
import { registerAction } from '../../actions/authActions';
import { alertClear } from '../../actions/alertActions';
import { validateRequired } from '../../utils/helpers';
import AuthComponent from '../AuthComponent';

/**
 * RegisterPage class declaration
 * @class RegisterPage
 * @extends {React.Component}
 */
export class RegisterPage extends Component {
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
      this.props.registerAction(userCredentials, this.props.history);
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
    const { alertState, loginState } = this.props;

    return (
      <AuthComponent
        alertState={ alertState }
        authType= 'register'
        authSubmit={ this.handleSubmit }
        onAlertClose={ this.onAlertClose }
        authState={ loginState}
        authErrors={ this.state.errors }
      />
    );
  }
}

RegisterPage.propTypes = {
  alertState: PropTypes.object.isRequired,
  loginState: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  registerAction: PropTypes.func.isRequired,
  alertClear: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  alertState: state.alertReducer,
  loginState: state.loginReducer
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ registerAction, alertClear }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
