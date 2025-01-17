const Contact = require("../../models/contact");
const { RequestError } = require("../../helpers");

const getOneById = async (req, res, next) => {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId);
    if (!result) {
      throw RequestError(404, "Not Found");
    }
    res.status(200).json(result);
};

module.exports = getOneById;