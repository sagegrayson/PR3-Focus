import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router, Route } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import Login from "./Login";
import Dashboard from "./Dashboard";
import { ContactsProvider } from "../context/ContactsProvider";
import { ConversationsProvider } from "../context/ConversationsProvider";
import { SocketProvider } from "../context/SocketProvider";
import Signup from "./Signup";

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});

function App() {
  const [id, setId] = useLocalStorage("id");

  const dashBoard = (
    <ApolloProvider client={client}>
      <SocketProvider id={id}>
        <ContactsProvider>
          <ConversationsProvider id={id}>
            <Dashboard id={id} />
          </ConversationsProvider>
        </ContactsProvider>
      </SocketProvider>
      <Router>
        <Route>
          <Signup onIdSubmit={setId} exact path="/Signup" />
        </Route>
      </Router>
    </ApolloProvider>
  );

  return id ? dashBoard : <Login onIdSubmit={setId} />;
}

export default App;
