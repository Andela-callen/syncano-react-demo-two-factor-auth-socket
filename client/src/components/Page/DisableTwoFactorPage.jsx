import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'react-proptypes';
import FormField from '../Common/FormField';
import Alert from '../Common/Alert';
import { disableTwoFactorAction } from '../../actions/twoFactorActions';
import { alertClear } from '../../actions/alertActions';

/**
 * DisableTwoFactorPage class declaration
 * @class DisableTwoFactorPage
 * @extends {React.Component}
 */
export class DisableTwoFactorPage extends Component {
  state = {
    twoFactorToken: ''
  };

  /**
   * Handle change
   * @param {event} event - event
   * @return {void} void
   */
  handleChange = (event) => {
    this.setState({ twoFactorToken: event.target.value });
  };

  /**
   * Handle two factor token verification
   * @param {object} event
   * @return {void} void
   */
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.disableTwoFactorAction(this.state.twoFactorToken, this.props.history);
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
    const { alertState } = this.props;
    const { type: alertType, message: alertMessage } = alertState;

    return (
      <div className="offset-sm-2 col-sm-8 offset-lg-3 col-lg-6">
        { alertState.message ?
          <Alert
            alertType={ alertType }
            message={ alertMessage }
            onAlertClose={ this.onAlertClose }
          /> : null
        }
        <span>
          <h2 className="mb-3">Disable Two-factor Auth</h2>
          <form onSubmit={ this.handleSubmit }>
            <FormField
              onChange={ this.handleChange }
              value={ this.state.twoFactorToken }
              name="twoFactorToken"
              label='OTP Token'
            />
            <div className="offset-sm-3 col-sm-6">
              <button type="submit" className="btn btn-secondary btn-block">Confirm</button>
            </div>
          </form>
        </span>
      </div>
    );
  }
}

DisableTwoFactorPage.propTypes = {
  twoFactorState: PropTypes.object.isRequired,
  alertState: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  disableTwoFactorAction: PropTypes.func.isRequired,
  alertClear: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  twoFactorState: state.twoFactorReducer,
  alertState: state.alertReducer
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ disableTwoFactorAction, alertClear }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DisableTwoFactorPage);
