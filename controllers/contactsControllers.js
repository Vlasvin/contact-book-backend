const express = require("express");
const contactsService = require("../services/contactsServices.js");
const { ctrlWrapper, HttpError } = require("../helpers");

const getAllContacts = async (req, res) => {
  const contacts = await contactsService.listContacts();
  res.status(200).json(contacts);
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  const contact = await contactsService.getContactById(id);
  res.status(200).json(contact);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const contact = await contactsService.removeContact(id);
  res.status(200).json(contact);
};

const createContact = async (req, res) => {
  const contact = await contactsService.addContact(req.body);
  res.status(201).json(contact);
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const contact = await contactsService.updateStatusContact(id, req.body);
  res.status(200).json(contact);
};

const updateFavorite = async (req, res) => {
  const { id } = req.params;
  const contact = await contactsService.updateContact(id, req.body);
  if (!req.body.favorite) {
    throw HttpError(400, "missing field favorite");
  }
  res.status(200).json(contact);
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getById: ctrlWrapper(getById),
  deleteContact: ctrlWrapper(deleteContact),
  createContact: ctrlWrapper(createContact),
  updateContact: ctrlWrapper(updateContact),
  updateFavorite: ctrlWrapper(updateFavorite),
};
