import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Amplify } from 'aws-amplify';
import awsExports from "./aws-exports";
import { BrowserRouter } from "react-router-dom";
import { Authenticator } from '@aws-amplify/ui-react';

const isDevelopment = process.env.REACT_APP_ENV === 'development';

const config = {
  ...awsExports,
  oauth: {
      ...awsExports.oauth,
      redirectSignIn: isDevelopment 
        ? 'http://localhost:3000/'
        : 'https://mynimbusapp.com/',
      redirectSignOut: isDevelopment 
        ? 'http://localhost:3000/'
        : 'https://mynimbusapp.com/',
  }
};

Amplify.configure(config);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Authenticator.Provider>
      <App />
    </Authenticator.Provider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
