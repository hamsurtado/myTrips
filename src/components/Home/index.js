import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';


function Home() {


  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(user => setUser(user))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h1>Welcome, {user && user.attributes.given_name}!</h1>
      <button className='nimbus-button' onClick={() => navigate(`/create-trip`)}>Create Trip</button>
    </div>
  );
}

export default Home;