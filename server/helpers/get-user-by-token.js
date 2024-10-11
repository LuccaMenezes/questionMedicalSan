const jwt = require("jsonwebtoken");

const Users = require("../models/users");

const getUserByToken = async (token) => {
  if (!token) {
   return res.status(401).json({ error: "Acesso negado!" });
  }

  const decoded = jwt.verify(token, "nossosecret");

  const userId = decoded.id;

  const user = await Users.findOne({ _id: userId});

  return user;
};

module.exports = getUserByToken;