const Contact = require("../../models/contact");
const { RequestError } = require("../../helpers");

const updateStatusContact = async (req, res, next) => {
    const { contactId } = req.params;
    const { favorite } = req.body;
    const result = await Contact.findByIdAndUpdate(contactId, {favorite}, { new: true });
    if (!result) {
      throw RequestError(404, "Not Found");
    }
    res.status(200).json(result);
};

module.exports = updateStatusContact;