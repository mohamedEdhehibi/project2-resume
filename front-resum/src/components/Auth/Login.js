import Form from 'react-bootstrap/Form';
import image from '../../assets/register.png';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { auth, loading, loginUser } from '../../redux/actiontype';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = { email, password };
  const login = () => {
    dispatch(loginUser(data)).payload.then((response) => {
      console.log(response);
      dispatch(auth(response.data))
      localStorage.setItem('Token', response.accesToken);
      navigate('/orderlist');
      dispatch(loading())
    });
  };
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      <Form className="content">
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="name@example.com"
            autoComplete={false}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="******"
            autoComplete={false}
          />
        </Form.Group>
          
            
            
 
       
        <Form.Group>
          <Button onClick={() => login()} className="mx-3" variant="primary">
          Login
          </Button>
          <Button variant="secondary">Cancel</Button>
        </Form.Group>
      </Form>
      {/* <img src={image} alt='register' width="50px"/> */}
    </>
  );
}

export default Login;
