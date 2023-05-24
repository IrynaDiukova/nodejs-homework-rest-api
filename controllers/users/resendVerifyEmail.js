const { RequestError, sendEmail } = require("../../helpers");
const User = require("../../models/user");
const { BASE_URL } = process.env;

const resendVerifyEmail = async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email })

    if (!user) {
        throw RequestError(404, "missing required field email");
    }

    if (user.verify) {
        throw RequestError(400, "Verification has already been passed");
    }

    const verifyEmail = {
        to: email,  
        subject: "verify email",
        html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Verify email identity</a>`
    };
    
    await sendEmail(verifyEmail);

    res.status(200).json({
        message: 'Verification email sent',
    });
};

module.exports = resendVerifyEmail;