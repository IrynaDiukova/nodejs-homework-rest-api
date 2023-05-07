const User = require("../../models/user");
const { RequestError } = require("../../helpers");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
require("dotenv").config();

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw RequestError(401, "Email or password is wrong");
  }
  const isValidPassword = await bcrypt.compare(
    password,
    user.password
  );
  
  if (!isValidPassword) {
    throw RequestError(401, "Email or password is wrong");
  }

  const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '23h' })
  await User.findByIdAndUpdate(user._id, { token })

  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  })
};

module.exports = login;


