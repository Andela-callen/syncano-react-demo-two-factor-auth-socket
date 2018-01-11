import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'react-proptypes';
import FormField from '../Common/FormField';
import Alert from '../Common/Alert';
import { verifyTwoFactorTokenAction, setUpTwoFactorAction } from '../../actions/twoFactorActions';
import { alertClear } from '../../actions/alertActions';

/**
 * SetUpTwoFactorPage class declaration
 * @class SetUpTwoFactorPage
 * @extends {React.Component}
 */
export class SetUpTwoFactorPage extends Component {
  state = {
    twoFactorToken: ''
  };

  /**
   * @method componentWillMount
   * @return {void} void
   */
  componentWillMount() {
    this.props.setUpTwoFactorAction(this.props.history);
  }

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
    this.props.verifyTwoFactorTokenAction(this.state.twoFactorToken, this.props.history);
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
    const { twoFactorState, alertState } = this.props;
    const { type: alertType, message: alertMessage } = alertState;
    const { twoFactorDetails } = twoFactorState;

    return (
      <div className="offset-sm-2 col-sm-8 offset-lg-3 col-lg-6">
        { alertMessage ?
          <Alert
            alertType={ alertType }
            message={ alertMessage }
            onAlertClose={ this.onAlertClose }
          /> : null
        }
        {
          (twoFactorDetails !== null) ?
            <span>
              <h3>Scan the QR code and enter the secret in Google Authenticator</h3>
              <img src={ twoFactorDetails.dataURL } className="img-thumbnail"/>
              <p>Secret - { twoFactorDetails.tempSecret }</p>
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
            : null
        }
      </div>
    );
  }
}

SetUpTwoFactorPage.propTypes = {
  twoFactorState: PropTypes.object.isRequired,
  alertState: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  verifyTwoFactorTokenAction: PropTypes.func.isRequired,
  setUpTwoFactorAction: PropTypes.func.isRequired,
  alertClear: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  twoFactorState: state.twoFactorReducer,
  alertState: state.alertReducer
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ verifyTwoFactorTokenAction, setUpTwoFactorAction, alertClear }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SetUpTwoFactorPage);
