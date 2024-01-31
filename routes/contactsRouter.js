const express = require("express");
const ctrl = require("../controllers/contactsControllers");
const { schemas } = require("../schemas/contactsSchemas");
const { validateBody, isValidId, contactWithoutId } = require("../middlewares");

const contactsRouter = express.Router();

contactsRouter.get("/", ctrl.getAllContacts);

contactsRouter.get("/:id", isValidId, contactWithoutId, ctrl.getById);

contactsRouter.delete("/:id", isValidId, contactWithoutId, ctrl.deleteContact);

contactsRouter.post(
  "/",
  validateBody(schemas.createContactSchema),
  ctrl.createContact
);

contactsRouter.put(
  "/:id",
  isValidId,
  contactWithoutId,
  validateBody(schemas.updateContactSchema),
  ctrl.updateContact
);

contactsRouter.patch(
  "/:id/favorite",
  isValidId,
  contactWithoutId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateFavorite
);

module.exports = contactsRouter;
