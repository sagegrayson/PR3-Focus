import React from "react";
import { useConversations } from "../context/ConversationsProvider";
import OpenConverstaion from "./OpenConverstaion";
import Sidebar from "./Sidebar";

export default function DashBoard({ id }) {
  const { selectedConversation } = useConversations();

  return (
    <div className="d-flex " style={{ height: "100vh" }}>
      <Sidebar id={id} />
      {selectedConversation && <OpenConverstaion />}
    </div>
  );
}
