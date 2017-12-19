import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'react-proptypes';
import Alert from '../Common/Alert';
import { alertClear } from '../../actions/alertActions';
import { checkTwoFactorAction } from '../../actions/twoFactorActions';

/**
 * HomePage class declaration
 * @extends {React.Component}
 */
class HomePage extends Component {
  /**
   * @method componentWillMount
   * @return {void} void
   */
  componentWillMount() {
    if (sessionStorage.token && sessionStorage.username) {
      this.props.checkTwoFactorAction();
    }
  }

  /**
   * function to handlling two factor disable
   * @return {void} void
   */
  disableTwoFactor = () => {
    this.props.alertClear();
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
      <section className="jumbotron text-center">
        <div className="container">
          <h1 className="jumbotron-heading">Syncano two factor authentication</h1>
          {
            (!sessionStorage.getItem('token') && !sessionStorage.getItem('username')) ?
              <section>
                <p className="lead text-muted">Demo app showing the implementation of two factor authentication socket.</p>
              </section> :
              <section>
                <h3 className="jumbotron-heading">Welcome { sessionStorage.getItem('username')}</h3>
                <p>
                  {
                    (this.props.twoFactorState.isTwoFactor !== true) ?
                      <Link to="/two-factor-setup" className="btn btn-primary">Setup Two-factor Auth</Link> :
                      <Link to="/two-factor-disable" className="btn btn-danger">Disable Two-factor Auth</Link>
                  }
                </p>
                { this.props.alertState.message ?
                  <Alert
                    alertType={this.props.alertState.type}
                    message={this.props.alertState.message}
                    onAlertClose={this.onAlertClose}
                  /> : null
                }
              </section>
          }
        </div>
      </section>
    );
  }
}

HomePage.propTypes = {
  twoFactorState: PropTypes.object,
  alertState: PropTypes.object,
  checkTwoFactorAction: PropTypes.func,
  onAlertClose: PropTypes.func,
  alertClear: PropTypes.func
};

const mapStateToProps = state => ({
  twoFactorState: state.twoFactorReducer,
  alertState: state.alertReducer
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ checkTwoFactorAction, alertClear }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
