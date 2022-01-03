const express = require("express");
const { ApolloServer } = require("apollo-server-express");

const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ==== JIMMY SOCKET.IO WORK ==== //
// const io = require("socket.io")(5000, {
//   cors: {
//     origin: ["http://localhost:3000"],
//   },
// });

// io.on("connection", (socket) => {
//   const id = socket.handshake.query.id;
//   socket.join(id);

//   socket.on("send-message", ({ recipients, text }) => {
//     recipients.forEach((recipient) => {
//       const newRecipients = recipients.filter((r) => r !== recipient);
//       newRecipients.push(id);
//       socket.broadcast.to(recipient).emit("receive-message", {
//         recipients: newRecipients,
//         sender: id,
//         text,
//       });
//     });
//   });
// });

// PORT
db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
