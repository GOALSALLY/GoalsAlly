import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Googleloginbutton from '../../components';

const Signin = () => {
  const [message, setMessage] = useState('');

  const initialValues = {
    email: '',
    password: '',
    rememberMe: false,
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signin', values);
      setMessage('Signin successful');
    } catch (error) {
      setMessage('Signin failed');
    }
    setSubmitting(false);
  };

  return (
    <div>
      <h2>Signin</h2>
      {message && <div>{message}</div>}
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="email">Email</label>
              <Field type="email" name="email" />
              <ErrorMessage name="email" component="div" />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <Field type="password" name="password" />
              <ErrorMessage name="password" component="div" />
            </div>
            <div>
              <label>
                <Field type="checkbox" name="rememberMe" />
                Remember Me
              </label>
            </div>
            <button type="submit" disabled={isSubmitting}>
              Signin
            </button>
          </Form>
        )}
      </Formik>
      <Googleloginbutton />
    </div>
  );
};

export default Signin;
