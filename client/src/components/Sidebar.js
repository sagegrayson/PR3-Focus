import React, { useState } from "react";
import { Tab, Nav, Button, Modal } from "react-bootstrap";
import Contacts from "./Contacts";
import Conversations from "./Conversations";
import NewConversationModal from "./NewConversationModal";
import NewContactModal from "./NewContactModal";
const CONVERSATIONS_KEY = "conversations";
const CONTACT_KEY = "contact";
export default function Sidebar({ id }) {
  const [activeKey, setActiveKey] = useState(CONVERSATIONS_KEY);
  const [modalOpen, setModalOpen] = useState(false);
  const conversationsOpen = activeKey === CONVERSATIONS_KEY;

  function handlelogout() {
    localStorage.removeItem("id_token");
    window.location.reload();
  }

  function closeModal() {
    setModalOpen(false);
  }

  return (
    <div
      style={{ width: "250px" }}
      className="black-gold-sidebar d-flex flex-column"
    >
      <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
        <Nav variant="tabs" className="justify-content-center" id="tabs">
          <Nav.Item>
            <Nav.Link eventKey={CONVERSATIONS_KEY}>Conversations</Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link eventKey={CONTACT_KEY}>Contacts</Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content
          id="sidebar-list"
          className="border-right overflow-auto flex-grow-1"
        >
          <Tab.Pane eventKey={CONVERSATIONS_KEY}>
            <Conversations />
          </Tab.Pane>

          <Tab.Pane eventKey={CONTACT_KEY}>
            <Contacts />
          </Tab.Pane>
        </Tab.Content>
        <div id="id" className="p-2 border-right small">
          Your Id: <span className="text-muted">{id}</span>
        </div>

        <Button
          onClick={() => {
            setModalOpen(true);
          }}
          className="rounded-0"
          id="newConvoBtn"
          as="button"
        >
          New {conversationsOpen ? "Conversation" : "Contact"}
        </Button>
        <Button onClick={handlelogout}>Log out</Button>
      </Tab.Container>

      <Modal show={modalOpen} onHide={closeModal}>
        {conversationsOpen ? (
          <NewConversationModal closeModal={closeModal} />
        ) : (
          <NewContactModal closeModal={closeModal} />
        )}
      </Modal>
    </div>
  );
}
