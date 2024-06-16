import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import 'aos/dist/aos.css';
import './css/style.css';

import AOS from 'aos';

import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ResetPassword from './pages/ResetPassword';
import Investments from './pages/Investments';
import Admin from './pages/Admin';
import { auth } from "./firebase";
import Tests from './pages/Tests';
import QuantitySelection from './pages/QuantitySelection';
import Summary from "./pages/Summary";
import AdminStats from "./partials/admin/AdminStats"
import AdminData from "./partials/admin/AdminData"
import AdminUsers from "./partials/admin/AdminUsers"
import SharedSummary from './pages/SharedSummary';

function App() {  

  const location = useLocation();

  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 700,
      easing: 'ease-out-cubic',
    });
  });


  // return to the top when route changes
  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // trigger
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/investments" element={<Investments />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/admin/dashboard" element={<Admin />} />
        <Route path="/admin/stats" element={<AdminStats />} />
        <Route path="/admin/data" element={<AdminData />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/quantity-selection" element={<QuantitySelection/>} />
        <Route path="/summary" element={<Summary />} />
        <Route path="/shared/:uuid" element={<SharedSummary />} />      
        
        </Routes>
    </>
  );
}

export default App;
