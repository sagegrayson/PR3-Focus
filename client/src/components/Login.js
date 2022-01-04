import React, { useRef, useState } from "react";
import { Container, Form, Button} from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import { v4 as uuidV4 } from "uuid";
export default function Login({ onIdSubmit }) {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const idRef = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await login({
        variables: { ...formState },
      });

      onIdSubmit(data.login.user.PhoneId);

      Auth.login(data.login.token);
    } catch (e) {
      alert("Account not found");
      console.error(e);
    }

    // clear form values
    setFormState({
      email: "",
      password: "",
    });
  };

  return (
  
    <Container  id='landingPage'>
        <div class="focus">
            <span>FOCUS</span>
          </div>
    <Container
      className="align-items-center d-flex"
      id = 'loginForm'
    >
      <Form onSubmit={handleSubmit} className="w-100">
        <Form.Group>
          <Form.Label id = 'login'>Login</Form.Label>
          {/* <Form.Control type="text" ref={idRef} required /> */}
          <p id='emailDisplay'> Email </p>
          <Form.Control
            type="text"
            name="email"
            id='email'
            placeholder="Type your Email"
            value={formState.email}
            onChange={handleChange}
            required
          />
          <p id='passwordDisplay'> Password </p>
          <Form.Control
            type="password"
            name="password"
            id='password'
            value={formState.password}
            placeholder="Type your Password"
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="Primary" type="submit" id='login'>
          Login
        </Button>

        <Link to="/Signup" className="btn ml-2" id='signUp'>
          Create a new Account
        </Link>
      </Form>
    </Container>
    </Container>
  
  );
  }
