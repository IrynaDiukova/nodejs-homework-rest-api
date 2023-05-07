const jwt = require('jsonwebtoken')
const User  = require('../models/user')
const { RequestError } = require("../helpers");
const { SECRET_KEY } = process.env

const authenticate = async (req, res, next) => {
  const { authHeader = '' } = req.headers;
  const [type, token] = authHeader.split(' ');

  const error = RequestError(401, 'Not authorized')

    if (type !== 'Bearer') {
      next (error)
    }

    try {
      const { id } = jwt.verify(token, SECRET_KEY); 
      const user = await User.findById(id);

      if(!user || !user.token || user.token !== token){
        next (error)
    }
    
    req.user = user;
    next();
  } catch {
    next (error)
  }
};

module.exports = authenticate

