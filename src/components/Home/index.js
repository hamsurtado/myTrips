import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';


function Home() {


  const [user, setUser] = useState(null);

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(user => setUser(user))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h1>Welcome, {user && user.attributes.given_name}!</h1>
    </div>
  );
}

export default Home;