import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signedIn, signedOut } from '../actions';

const STREAMY_GOOGLE_OAUTH_CLIENT_ID = process.env.REACT_APP_STREAMY_GOOGLE_OAUTH_CLIENT_ID;

// console.log(`STREAMY_GOOGLE_OAUTH_CLIENT_ID: ${STREAMY_GOOGLE_OAUTH_CLIENT_ID}`);

class GoogleAuth extends Component {
  // Initialise Google OAuth API in componentDidMount
  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: STREAMY_GOOGLE_OAUTH_CLIENT_ID,
        scope: 'email'
      }).then(() => {
        // Keep google oauth2 instance as field
        this.googleOauth2 = window.gapi.auth2.getAuthInstance();

        // Initialise authRedux's state 
        this.onAuthChange(this.googleOauth2.isSignedIn.get());

        // Listen to google oauth2's isSignedIn event
        this.googleOauth2.isSignedIn.listen(this.onAuthChange);
      });
    });
  }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      const currentUser = this.googleOauth2.currentUser.get();
      const authResponse = currentUser.getAuthResponse();
      const basicProfile = currentUser.getBasicProfile();

      const id = currentUser.getId();
      const { token_type, access_token, expires_at  } = authResponse;
      const authToken = { token_type, access_token, expires_at  };
      const userProfile = { name: basicProfile.getName(), imageUrl: basicProfile.getImageUrl() };

      this.props.signedIn(id, authToken, userProfile);
    } else {
      this.props.signedOut();
    }
  }

  onSignInClick = () => {
    this.googleOauth2.signIn();
  }

  onSignOutClick = () => {
    this.googleOauth2.signOut();
  }

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button className="ui button google red" onClick={ this.onSignOutClick }>
          <i className="google icon"/>
          Sign Out
        </button>
      );
    }

    return (
      <button className="ui red google button" onClick={ this.onSignInClick }>
        <i className="google icon"/>
        Sign in with Google
      </button>
    );
  }

  render() {
    return (
      <div>{ this.renderAuthButton() }</div>
    );
  }
}

function mapStateToProps(state) {
  return { isSignedIn: state.auth.isSignedIn };
} 

export default connect(mapStateToProps, { signedIn, signedOut })(GoogleAuth);
