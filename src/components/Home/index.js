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
      <div className='page-title'>Welcome, {user && user.attributes.given_name}!</div>
    </div>
  );
}

export default Home;