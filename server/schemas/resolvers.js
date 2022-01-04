const { User } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");
const { v4: uuidv4 } = require("uuid");
const resolvers = {
  Query: {
    Users: async () => {
      return await User.find({});
    },
    User: async (parent, args) => {
      return await User.findById(args.id);
    },
    SingleUser: async (parents, args) => {
      return await User.findOne({ email: args.email, password: args.password });
    },
  },
  Mutation: {
    createUser: async (paraents, { email, password }) => {
      const phoneId = uuidv4();

      const user = await User.create({
        email,
        password,
        phoneId,
      });

      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No profile with this email found!");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password!");
      }

      const token = signToken(user);
      return { token, user };
    },
  },
};

module.exports = resolvers;
