const express = require("express");
const {
  getAllContacts,
  getById,
  deleteContact,
  createContact,
  updateContact,
  updateFavorite,
} = require("../controllers/contactsControllers");
const schemas = require("../schemas/contactsSchemas");
const { validateBody, isValidId, contactWithoutId } = require("../middlewares");

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", isValidId, contactWithoutId, getById);

contactsRouter.delete("/:id", isValidId, contactWithoutId, deleteContact);

contactsRouter.post(
  "/",
  validateBody(schemas.createContactSchema),
  createContact
);

contactsRouter.put(
  "/:id",
  isValidId,
  contactWithoutId,
  validateBody(schemas.updateContactSchema),
  updateContact
);

contactsRouter.patch(
  "/:Id/favorite",
  isValidId,
  contactWithoutId,
  validateBody(schemas.updateFavoriteSchema),
  updateFavorite
);

module.exports = contactsRouter;
