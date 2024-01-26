const { HttpError } = require("../helpers");
const contactsService = require("../services/contactsServices.js");

const contactWithoutId = async (req, res, next) => {
  const { id } = req.params;
  const contact = await contactsService.getContactById(id);

  if (!contact) {
    throw HttpError(400, "Not found");
  }

  next();
};

module.exports = contactWithoutId;
