import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const Googleloginbutton = () => {
  const handleLoginSuccess = (response) => {
    console.log('Login Success:', response);
    // Handle successful login and token storage
  };

  const handleLoginFailure = (response) => {
    console.error('Login Failure:', response);
    // Handle failed login
  };

  return (
    <GoogleOAuthProvider clientId="737830184938-edhgbhqp72mfd5368d0vuvd75vq9sevv.apps.googleusercontent.com">
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onFailure={handleLoginFailure}
        buttonText="Login with Google"
      />
    </GoogleOAuthProvider>
  );
};

export default Googleloginbutton;
