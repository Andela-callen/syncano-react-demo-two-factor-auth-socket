import React from 'react';

/**
 * HomePage component
 * @param {object} props
 * @return {XML} JSX
 */
const HomePage = () => (
  <section className="jumbotron text-center">
    <div className="container">
      <h1 className="jumbotron-heading">Syncano two factor authentication</h1>
      <h4 className="jumbotron-heading text-muted">Demo app showing the implementation of two factor authentication socket.</h4>
      <div className="mt-5">
        <div className="mb-4">
          <a className="btn btn-secondary" href="https://github.com/Syncano/syncano-socket-two-factor-auth" target="_blank" rel="noopener noreferrer">
            Two-factor auth socket repo
          </a>
        </div>
        <div className="mb-4">
          <a className="btn btn-secondary" href="https://github.com/Syncano/syncano-react-demo-two-factor-auth-socket" target="_blank" rel="noopener noreferrer">
            Two-factor auth socket demo repo
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default HomePage;
