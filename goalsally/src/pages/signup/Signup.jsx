import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import zxcvbn from 'zxcvbn';
import { FaEye, FaEyeSlash } from 'react-icons/fa'

const Signup = () => {
  const [message, setMessage] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(null);
  const [showPassword, setShowPassword] = useState(false)

  const initialValues = {
    username: '',
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', values);
      console.log(response);  // Use the response variable here
      setMessage('Signup successful');
    } catch (error) {
      setMessage('Signup failed');
    }
    setSubmitting(false);
  };

  const handlePasswordChange = (event) => {
    const password = event.target.value;
    setPasswordStrength(zxcvbn(password));
  };

  return (
    <div>
      <h2>Signup</h2>
      {message && <div>{message}</div>}
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ isSubmitting, handleChange }) => (
          <Form>
            <div>
              <label for="username">Username</label>
              <Field type="text" name="username" />
              <ErrorMessage name="username" component="div" />
            </div>
            <div>
              <label for="email">Email</label>
              <Field type="email" name="email" />
              <ErrorMessage name="email" component="div" />
            </div>
            <div>
              <label for="password">Password</label>
              <div style={{ position: 'relative' }}>
                <Field
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  onChange={(e) => {
                    handleChange(e);
                    handlePasswordChange(e);
                  }}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: 10, top: 10, cursor: 'pointer' }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              <ErrorMessage name="password" component="div" />
              {passwordStrength && (
                <div>
                  <strong>Password strength:</strong>
                  <span>{passwordStrength.score}</span>
                  <ul>
                    {passwordStrength.feedback.suggestions.map((suggestion, index) => (
                      <li key={index}>{suggestion}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <button type="submit" disabled={isSubmitting}>
              Signup
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Signup;
