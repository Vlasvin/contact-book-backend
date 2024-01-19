const express = require("express");
const contactsService = require("../services/contactsServices.js");
const HttpError = require("../helpers/HttpError.js");
const ctrlWrapper = require("../helpers/ctrlWrapper.js");

const getAllContacts = async (req, res) => {
  const contacts = await contactsService.listContacts();
  res.status(200).json(contacts);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const contact = await contactsService.getContactById(id);

  if (!contact) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(contact);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const contact = await contactsService.removeContact(id);

  if (!contact) {
    throw HttpError(400, "Not found");
  }
  console.log(contact);
  res.status(200).json(contact);
};

const createContact = async (req, res) => {
  const contact = await contactsService.addContact(req.body);
  res.status(201).json(contact);
};

const updateContact = async (req, res) => {
  const hasAtLeastOneField = Object.keys(req.body).length > 0;
  if (!hasAtLeastOneField) {
    throw HttpError(400, "Body must have at least one field");
  }
  const { id } = req.params;
  const contact = contactsService.updateContact(id, req.body);
  console.log(req.body);
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
