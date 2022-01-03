import React, { useRef, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
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
      console.error(e);
    }

    // clear form values
    setFormState({
      email: "",
      password: "",
    });
  };

  let history = useHistory();
  const redirect = () => {
    history.push("/Signup");
  };

  return (
    <Container
      className="align-items-center d-flex"
      style={{ height: "100vh" }}
    >
      <Form onSubmit={handleSubmit} className="w-100">
        <Form.Group>
          <Form.Label>Login</Form.Label>
          {/* <Form.Control type="text" ref={idRef} required /> */}
          <Form.Control
            type="text"
            name="email"
            placeholder="email"
            value={formState.email}
            onChange={handleChange}
            required
          />
          <Form.Control
            type="password"
            name="password"
            value={formState.password}
            placeholder="password"
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="Primary" type="submit">
          Login
        </Button>

        <Button variant="secondary" onClick={redirect} className="ml-2">
          Create a new Account
        </Button>
      </Form>
    </Container>
  );
}
