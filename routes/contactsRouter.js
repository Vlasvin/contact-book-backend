const express = require("express");
const {
  getAllContacts,
  getById,
  deleteContact,
  createContact,
  updateContact,
} = require("../controllers/contactsControllers");
const schemas = require("../schemas/contactsSchemas");
const validateBody = require("../helpers/validateBody");

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", getById);

contactsRouter.delete("/:id", deleteContact);

contactsRouter.post(
  "/",
  validateBody(schemas.createContactSchema),
  createContact
);

contactsRouter.put(
  "/:id",
  validateBody(schemas.updateContactSchema),
  updateContact
);

module.exports = contactsRouter;
