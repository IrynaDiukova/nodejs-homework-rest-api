const User = require('../../models/user');
const { RequestError, sendEmail } = require("../../helpers");
const bcrypt = require('bcrypt');
const gravatar = require("gravatar");
const {nanoid} = require("nanoid");
const { BASE_URL } = process.env;


const register = async(req,res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (user) {
        throw RequestError(409, 'Email in use')
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt)
    const avatarURL = gravatar.url(email);
    const verificationToken = nanoid();
    

    const result = await User.create({
        email, 
        password: hashedPassword,
        avatarURL,
        verificationToken
    });

    const verifyEmail = {
        to: email,  
        subject: "verify email",
        html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Verify email identity</a>`
    };
    
    await sendEmail(verifyEmail);
    
    res.status(201).json({
        id: result._id,
        email: result.email,  
    })
    
};

module.exports = register;