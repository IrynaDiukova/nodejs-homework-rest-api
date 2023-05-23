const User = require("../../models/user");
const { RequestError } = require("../../helpers");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const { SECRET_KEY } = process.env;


const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw RequestError(401, "Email or password is wrong");
  }

  if (!user.verify) {
    throw RequestError(401, "Email not verify");
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


