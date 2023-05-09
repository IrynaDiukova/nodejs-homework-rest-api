const Contact = require("../../models/contact");

const getAll = async (req, res) => {
    const { page, limit }  = req.query;
    const skip = (page - 1) * limit;
    
    const result = await Contact.find().skip(skip).limit(limit);

    res.status(200).json(result);
}

module.exports = getAll;