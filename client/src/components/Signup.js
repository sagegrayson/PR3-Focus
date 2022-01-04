import React, { useState } from "react";

import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import { Container, Form, Button } from "react-bootstrap";
import Auth from "../utils/auth";
export default function Signup({ onIdSubmit }) {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      onIdSubmit(data.createUser.user.phoneId);

      Auth.login(data.createUser.token);
    } catch (e) {
      alert("something went wrong");
      console.error(e);
    }
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
          <Form.Label  id='emailDisplay' className="black-gold">Email</Form.Label>
          {/* <Form.Control type="text" ref={idRef} required /> */}
          <Form.Control
            type="email"
            name="email"
            id='email'
            placeholder="Type your Email"
            value={formState.email}
            onChange={handleChange}
            required
          />
          <Form.Label id='passwordDisplay' className="black-gold">Password</Form.Label>
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
        <Button type="submit" className="mr-2" id='createAcct'>
          Create account
        </Button>
      </Form>
    </Container>
    </Container>
  );
}
