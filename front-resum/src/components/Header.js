import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

import '../App.css'
import { useDispatch } from 'react-redux';
import { logoutUser } from '../redux/actiontype';
const Header = () => {
    const navigate=useNavigate();
   const dispatch= useDispatch()
    const logout =()=>{
        localStorage.setItem('Token','')
        dispatch(logoutUser())
        
        navigate('/login')
    }
    return (<>
        <Navbar expand="lg" className='navbar1'>
            <Container>
                <Navbar.Brand href="/">E-SHOP</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/productlist">In Stock</Nav.Link>
                        <Nav.Link href="/orderlist">Order</Nav.Link>

                    </Nav>
                    <Button onClick={()=>logout()} variant="info">Logout</Button>{' '}
                </Navbar.Collapse>
            </Container>
        </Navbar>
       
    </>
    )
}

export default Header