const { Contact } = require("../schemas/contactsSchemas");

const listContacts = async () => {
  return Contact.find();
};

const getContactById = async (contactId) => {
  return Contact.findById(contactId).select("-__v");
};

const removeContact = async (contactId) => {
  return Contact.findByIdAndDelete(contactId).select("-__v");
};

const updateContact = async (contactId, body) => {
  return Contact.findByIdAndUpdate(contactId, body, { new: true }).select(
    "-__v"
  );
};

const addContact = async (body) => {
  return Contact.create(body).select("-__v");
};

const updateStatusContact = async (contactId, body) => {
  return Contact.findByIdAndUpdate(contactId, body, { new: true }).select(
    "-__v"
  );
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
