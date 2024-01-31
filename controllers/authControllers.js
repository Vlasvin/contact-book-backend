const { User } = require("../schemas/usersSchemas");
const { ctrlWrapper, HttpError } = require("../helpers");

const register = async (req, res) => {
  const newUser = await User.create(req.body);
  res.json({
    email: newUser.email,
    name: newUser.name,
  });
};

module.exports = {
  register: ctrlWrapper(register),
};
