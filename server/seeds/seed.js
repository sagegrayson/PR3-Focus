const db = require("../config/connection");
const { User } = require("../models");
const userData = require("./userData.json");
db.once("open", async () => {
  // clean database
  await User.deleteMany({});

  //
  const Users = await User.insertMany(userData);

  console.log("all done!");
  process.exit(0);
});
