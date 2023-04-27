const contacts = require("../../models/contacts");
const RequestError = require("../../helpers");

const getOneById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) {
      throw RequestError(404, "Not Found");
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = getOneById;