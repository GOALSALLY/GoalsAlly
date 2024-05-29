import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Googleloginbutton } from '../../components';
import { FaEye, FaEyeSlash } from 'react-icons/fa'

const Signin = () => {
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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
      console.log(response);  // Use the response variable here
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
              <label for="email">Email</label>
              <Field type="email" name="email" />
              <span
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: 10, top: 10, cursor: 'pointer' }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              <ErrorMessage name="email" component="div" />
            </div>
            <div>
              <label for="password">Password</label>
              <Field type={showPassword ? "text" : "password"} name="password" onChange={handleChange}/>
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

