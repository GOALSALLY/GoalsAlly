import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const Googleloginbutton = () => {
  const clientId = '737830184938-edhgbhqp72mfd5368d0vuvd75vq9sevv.apps.googleusercontent.com';

  const onSuccess = (response) => {
    console.log('Login Success:', response);
    // Handle successful login here
  };

  const onError = () => {
    console.log('Login failed');
    alert('Failed to login with Google. Please try again.');
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        buttonText="Login with Google"
        onSuccess={onSuccess}
        onError={onError}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
      />
    </GoogleOAuthProvider>
  );
};

export default Googleloginbutton;

