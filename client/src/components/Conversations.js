import React from "react";
import { ListGroup, Button } from "react-bootstrap";
import { useConversations } from "../context/ConversationsProvider";
export default function Conversations() {
  const { conversations, selectConversationIndex, removeConversation } =
    useConversations();

  return (
    <ListGroup variant="flush">
      {conversations.map((conversation, index) => (
        <ListGroup.Item
          key={index}
          action
          onClick={() => {
            selectConversationIndex(index);
          }}
          active={conversation.selected}
        >
          {conversation.recipients.map((r) => r.name).join(", ")}
          <div
            onClick={(e) => {
              removeConversation(index);
            }}
            style={{ width: "10%", background: "white" }}
            className="text-center"
          >
            X
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
