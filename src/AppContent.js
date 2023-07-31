import logo from './logo.svg';
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
import "@aws-amplify/ui-react/styles.css";


import { useAuthenticator, Button } from '@aws-amplify/ui-react';


function AppContent() {
  const { signOut } = useAuthenticator((context) => [context.user]);
  const [isExpanded, setIsExpanded] = useState(true)

  return (
      <div className="App">
        <Sidebar className='my-sidebar' collapsedWidth='75px' width='350px' collapsed={!isExpanded}>


          <Menu className='menu' iconShape="square">

            <MenuItem
                className="menu-item"
                icon={<MenuOutlinedIcon />}
                onClick={() => {
                    setIsExpanded(!isExpanded);
                }}
                style={{ textAlign: "center", 'margin-bottom': "30px" }}
            >
                {" "}
                <h2>My Trip Planner</h2>
            </MenuItem>
            
            <Link to="/" className="menu-item">
              <MenuItem icon={<HomeOutlined color='primary' />} >Home</MenuItem>
            </Link>

            <Link to="/create-trip" className="menu-item">
              <MenuItem icon={<AddCircle color='primary' />}>Create Trip</MenuItem>
            </Link>
            
            <Link to="/mytrips" className="menu-item">
              <MenuItem icon={<Flight color='primary' />}>My Trips</MenuItem>
            </Link>
            
            

            <MenuItem className='sign-out-button menu-item' icon={<LogoutIcon color='primary' />}  onClick={signOut}>Sign Out</MenuItem>
            
            
          </Menu>
        </Sidebar>

        <main class='main-component'>
          <Routes>
            <Route path="/create-trip" element={<CreateTrip />} />
            <Route path="/" element={<Home />} />
            <Route path="/mytrips" element={<MyTrips />} />
          </Routes>
        </main>
      </div>
  );
}

export default AppContent
