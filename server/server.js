const express = require("express");
const { ApolloServer } = require("apollo-server-express");

const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");

const PORT = process.env.PORT || 3001;
const app = express();
const httpServer = require("http").createServer(app);
const server = new ApolloServer({
	typeDefs,
	resolvers,
});

const path = require("path");

server.applyMiddleware({
	app,
	path: "/graphql",
	cors: {
		credentials: false,
		origin: process.env.DOMAIN_FULL + ":" + process.env.PORT || "3001",
	},
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ==== JIMMY SOCKET.IO WORK ==== //
const io = require("socket.io")(httpServer);

io.on("connection", (socket) => {
	const id = socket.handshake.query.id;
	socket.join(id);

	socket.on("send-message", ({ recipients, text }) => {
		recipients.forEach((recipient) => {
			const newRecipients = recipients.filter((r) => r !== recipient);
			newRecipients.push(id);
			socket.broadcast.to(recipient).emit("receive-message", {
				recipients: newRecipients,
				sender: id,
				text,
			});
		});
	});
});

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "../client/build/index.html"));
});
// PORT
db.once("open", () => {
	httpServer.listen(PORT, () => {
		console.log(`API server running on port ${PORT}!`);
		console.log(
			`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
		);
	});
});
