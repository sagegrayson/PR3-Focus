import React, { useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import { Container, Form, Button } from "react-bootstrap";
import Auth from "../utils/auth";
export default function Signup({ onIdSubmit }) {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    PhoneId: "",
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
    //const Phoneid = uuidV4();

    setFormState({
      ...formState,
      PhoneId: uuidV4(),
    });
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });
      onIdSubmit(data.createUser.user.PhoneId);

      Auth.login(data.createUser.token);
    } catch (e) {
      alert("something went wrong");
      console.error(e);
    }
  };

  return (
    <Container
      className="align-items-center d-flex"
      style={{ height: "100vh" }}
    >
      <Form onSubmit={handleSubmit} className="w-100">
        <Form.Group>
          <Form.Label>Enter Email</Form.Label>
          {/* <Form.Control type="text" ref={idRef} required /> */}
          <Form.Control
            type="email"
            name="email"
            placeholder="email"
            value={formState.email}
            onChange={handleChange}
            required
          />
          <Form.Label>Enter Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formState.password}
            placeholder="password"
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button type="submit" className="mr-2">
          Create account
        </Button>
      </Form>
    </Container>
  );
}
