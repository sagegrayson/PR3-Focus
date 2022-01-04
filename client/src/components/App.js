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
import '../assets/css/style.scss';

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});

function App() {
  const [id, setId] = useLocalStorage("id");
  const token = localStorage.getItem("id_token");
  let logged;

  if (token === null) {
    logged = false;
  } else {
    logged = true;
  }

  const dashBoard = (
    <ApolloProvider client={client}>
      <SocketProvider id={id}>
        <ContactsProvider>
          <ConversationsProvider id={id}>
            <Dashboard id={id} />
          </ConversationsProvider>
        </ContactsProvider>
      </SocketProvider>
    </ApolloProvider>
  );

  const loginPage = (
    <ApolloProvider client={client}>
      <Router>
        <Route exact path="/">
          <Login onIdSubmit={setId} />
        </Route>
        <Route exact path="/Signup">
          <Signup onIdSubmit={setId} />
        </Route>
      </Router>
    </ApolloProvider>
  );

  return logged ? dashBoard : loginPage;
}

export default App;
