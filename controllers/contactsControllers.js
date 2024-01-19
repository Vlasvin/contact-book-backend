const express = require("express");
const contactsService = require("../services/contactsServices.js");
const HttpError = require("../helpers/HttpError.js");
const ctrlWrapper = require("../helpers/ctrlWrapper.js");
const {
  createContactSchema,
  updateContactSchema,
} = require("../schemas/contactsSchemas.js");

const getAllContacts = async (req, res, next) => {
  const contacts = await contactsService.listContacts();
  res.status(200).json(contacts);
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  const contact = await contactsService.getContactById(id);

  if (!contact) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(contact);
};

const deleteContact = (req, res, next) => {
  const { id } = req.params;
  const contact = contactsService.removeContact(id);

  if (!contact) {
    throw HttpError(400, "Not found");
  }
  res.json({ message: "Delete success" });
};

const createContact = async (req, res, next) => {
  const { error } = createContactSchema.validate(req.body);

  if (error) {
    throw HttpError(400, error.message);
  }
  const contact = await contactsService.addContact(req.body);
  res.status(201).json(contact);
};

const updateContact = async (req, res, next) => {
  const { error } = updateContactSchema.validate(req.body);

  if (error) {
    throw HttpError(400, error.message);
  }

  const hasAtLeastOneField = Object.keys(req.body).length > 0;
  if (!hasAtLeastOneField) {
    throw new HttpError(400, "Body must have at least one field");
  }

  const { id } = req.params;
  const contact = contactsService.updateContact(id, req.body);

  if (!contact) {
    throw HttpError(400, "Not found");
  }
  res.status(200).json(contact);
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getById: ctrlWrapper(getById),
  deleteContact: ctrlWrapper(deleteContact),
  createContact: ctrlWrapper(createContact),
  updateContact: ctrlWrapper(updateContact),
};
