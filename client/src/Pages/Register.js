import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../Hooks/Auth'
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";


const Register = (props) => {
  const { urlEndPoint } = props
  // console.log(urlEndPoint)
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerMessage, setRegisterMessage] = useState("");
  const auth = useAuth(); //access the authentication context 
	const navigate = useNavigate() // be able to navigate to home on login
  
  if(auth.userToken !== null){
    navigate('/dashboard')
  }

  
  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.log(urlEndPoint)
    // console.log(email)
    // console.log(password)
    axios.post(`${urlEndPoint}/registration`, 
    {
      email : email,
      password : password
    })
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      navigate('/dashboard')
    })
  }

  return (
    <Container id='welcome-container' fluid='md'>
      <Row className="justify-content-center">
        <h1>Welcome to my blogging app!</h1>
        <h3>Register to view all of the current blogs</h3>
        <p>Already a member? <a href="/login">Log in</a></p>
      </Row>
      <Row className="justify-content-center">
        <Col md={6}>
          <Form id='welcome-form'>

            <Form.Group className="md-3">
              <Form.Label>Email Address:</Form.Label>
              <Form.Control type="text" placeholder="Enter your email" onChange={(e) => {
                setEmail(e.target.value)
              }}></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Password:</Form.Label>
              <Form.Control type="password" placeholder="Enter your password" onChange={(e) => {
                setPassword(e.target.value)
              }}></Form.Control>
            </Form.Group>

            <Button 
              id="register-button"
              variant="primary" type="submit"
              onClick={(e) => {
                    handleSubmit(e)
                  }
                }
            >
              Register
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Register