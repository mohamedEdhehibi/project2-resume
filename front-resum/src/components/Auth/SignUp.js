
import Form from 'react-bootstrap/Form';
import image from '../../assets/register.png'
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {RegisterUser} from '../../redux/actiontype'

function SignUp() {
    const [userName,setUserName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const dispatch=useDispatch()

    const data={userName,email,password}
    const register=()=>{
        dispatch(RegisterUser(data))
        
    }
  return (
    <>
    <Form className='content'>
    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>User name</Form.Label>
        <Form.Control onChange={(e)=>setUserName(e.target.value)} type="text" placeholder="UserName" autoComplete="false"/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
        <Form.Label>Email address</Form.Label>
        <Form.Control onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="name@example.com" autoComplete="false"/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
        <Form.Label>Password</Form.Label>
        <Form.Control onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="******" autoComplete= "false" />
      </Form.Group>
      <Form.Group>
      <Button onClick={()=>register()} className='mx-3' variant="primary">Save</Button>
      <Button variant="secondary">Cancel</Button>
      </Form.Group>
    </Form>
    <img src={image} alt='register' width="400px"/>
    </>
  );
}

export default SignUp;