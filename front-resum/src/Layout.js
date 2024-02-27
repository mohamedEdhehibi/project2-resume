import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import SideBar from './components/SideBar';

function Layout() {
  return (
    <>
      <Header/>
      <SideBar />
      <Outlet />
    </>
  );
}

export default Layout;
