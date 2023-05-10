const User = require('../../models/user');
const { RequestError } = require("../../helpers");
const bcrypt = require('bcrypt');

const register = async(req,res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (user) {
        throw RequestError(409, 'Email in use')
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt)
    
    const result = await User.create({
        email, 
        password: hashedPassword,
    })
    res.status(201).json({
        id: result._id,
        email,  
    })
    
};

module.exports = register;