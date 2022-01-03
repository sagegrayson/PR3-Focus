const { School, Class, Professor, User } = require("../models");

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
};

module.exports = resolvers;
