const express = require("express");
const {
  getAllContacts,
  getById,
  deleteContact,
  createContact,
  updateContact,
} = require("../controllers/contactsControllers");

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", getById);

contactsRouter.delete("/:id", deleteContact);

contactsRouter.post("/", createContact);

contactsRouter.put("/:id", updateContact);

module.exports = contactsRouter;
