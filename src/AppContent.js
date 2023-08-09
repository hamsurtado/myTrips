
import './App.css';
import Amplify, {API} from "aws-amplify";
import { React, useState } from "react";
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Route, Routes, Link } from "react-router-dom";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import HomeOutlined from "@mui/icons-material/HomeOutlined";
import Flight from "@mui/icons-material/Flight";
import AddCircle from "@mui/icons-material/AddCircleOutline";
import LogoutIcon from '@mui/icons-material/Logout';

import Home from "./components/Home";
import MyTrips from "./components/MyTrips";
import CreateTrip from "./components/CreateTrip";
import TripDetails from "./components/TripDetails";
import AddDestination from "./components/TripDetails/AddDestination";
import "@aws-amplify/ui-react/styles.css";
import { useAuthenticator, Button } from '@aws-amplify/ui-react';
import Itinerary from './components/Itinerary';


function AppContent() {
  const { signOut } = useAuthenticator((context) => [context.user]);
  const [isExpanded, setIsExpanded] = useState(true)

  return (
      <div className="App">
        <Sidebar className='my-sidebar' collapsedWidth='5em' width='20em' collapsed={!isExpanded}>


          <Menu className='menu' iconShape="square">

          <MenuItem 
                className="no-hover-effect"
                style={{ textAlign: "center", 'margin-bottom': "90px" }}
            >
                {" "}
                <img className="nimbus" src={process.env.PUBLIC_URL + '/nimbus.png'}/>
                <div className='nimbus-label'>Nimbus
                <div className='cloud-companion-label'>My Cloud Companion</div>
                </div>

                
            </MenuItem>

            <MenuItem
                className="menu-item"
                icon={<MenuOutlinedIcon />}
                onClick={() => {
                    setIsExpanded(!isExpanded);
                }}
                style={{ textAlign: "center", 'font-size': '15px', 'margin-bottom': "30px" }}
            >
                {" "}
                <h2>Nimbus</h2>

                
            </MenuItem>
      
            <Link to="/" className="menu-item">
              <MenuItem icon={<HomeOutlined style={{ color: '#68a1b8' }} />} >Home</MenuItem>
            </Link>

            <Link to="/create-trip" className="menu-item">
              <MenuItem icon={<AddCircle style={{ color: '#68a1b8' }} />}>Create Trip</MenuItem>
            </Link>
            
            <Link to="/my-trips" className="menu-item">
              <MenuItem icon={<Flight style={{ color: '#68a1b8' }} />}>My Trips</MenuItem>
            </Link>
            
            

            <MenuItem className='sign-out-button menu-item' icon={<LogoutIcon style={{ color: '#68a1b8' }} />}  onClick={signOut}>Sign Out</MenuItem>
            
            
          </Menu>
        </Sidebar>

        <main class={`main-component ${isExpanded ? 'main-component-small' : 'main-component-wide'}`}>
          <Routes>
            <Route path="/create-trip" element={<CreateTrip />} />
            <Route path="/" element={<Home />} />
            <Route path="/my-trips" element={<MyTrips />} />
            <Route path="/trip/:id" element={<TripDetails isExpanded={isExpanded}/>} />
            <Route path="/trip/:id/add-destination" element={<AddDestination/>} />
            <Route path="/trip/:tripId/destination/:destinationId" element={<Itinerary/>} />
          </Routes>
        </main>
      </div>
  );
}

export default AppContent
