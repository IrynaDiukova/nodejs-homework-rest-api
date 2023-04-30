const Contact = require("../../models/contact");
const { RequestError } = require("../../helpers");

const removeById = async (req, res, next) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndDelete(contactId);
    if (!result) {
      throw RequestError(404, "Not Found");
    }
    res.status(200).json({ message: "contact deleted" });
};

module.exports = removeById;