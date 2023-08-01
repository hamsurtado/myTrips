import React from "react";
import AppContent from "./AppContent";
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';

const formFields = {
  signUp: {
    given_name: {
      order: 1
    },
    family_name: {
      order: 2
    },
    birthdate: {
      order: 3
    },
    email: {
      order:4
    },
    password: {
      order: 5
    },
    confirm_password: {
      order: 6
    }
  },
 }

function App() {
  const { authStatus } = useAuthenticator(context => [context.authStatus]);

  return authStatus !== 'authenticated' ? 
    <Authenticator formFields={formFields}/> : <AppContent/>;
    
}

export default App
