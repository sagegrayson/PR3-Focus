import React from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { useContacts } from "../context/ContactsProvider";
export default function Contacts() {
  const { contacts } = useContacts();

  return (
    <ListGroup variant="flush">
      {contacts.map((contact) => (
        <ListGroup.Item key={contact.id}>{contact.name}</ListGroup.Item>
      ))}
    </ListGroup>
  );
}
