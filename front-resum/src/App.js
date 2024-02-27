import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { auth,loading } from './redux/actiontype';
import axios from 'axios';
import { userService } from './Config';
import Dashboard from './components/Dashboard';
import ProductList from './components/ProductList';
import Orderlist from './components/Orderlist';
import ProductDetails from './components/ProductDetails';
import SignUp from './components/Auth/SignUp';
import Login from './components/Auth/Login';
import Layout from './Layout';


function App() {
  const dispatch = useDispatch();
  const userAuth = useSelector((state) => state.user);
  const loading = useSelector((state) => state.loading);
  
  useEffect(() => {
    // Make a GET request to fetch the current user data
    axios
    .get(`${userService}user/current`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('Token')}` },
    })
    .then((response) => {
      // console.log(response);
      // Dispatch an action to update the user authentication state in the Redux store
      dispatch(auth(response.data));
      
    })
    .catch((error) => {
      // Log an error message to the console if an error occurs during the request
      console.error('Error fetching current user:', error);
    });
  }, [loading]);
  
  //  const loading=true
  console.log(loading);
  // if(loading) return;
  return (
    <div className="App">
      <Router>
    
        <Routes>
          { !userAuth && !loading? (
            <>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<SignUp />} />
            </>
          ) : (
            <Route path='/' element={<Layout/>}>
            
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/productlist" element={<ProductList />} />
              <Route path="/orderlist" element={<Orderlist />} />
              <Route path="/orderlist/:id" element={<ProductDetails />} />
            </Route>
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
