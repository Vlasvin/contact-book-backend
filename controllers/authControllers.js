const gravatar = require("gravatar");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs/promises");
const crypto = require("crypto");
const Jimp = require("jimp");
require("dotenv").config();

const { User } = require("../schemas/usersSchemas");
const { ctrlWrapper, HttpError } = require("../helpers");

const { SECRET_KEY } = process.env;

const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const register = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const emailHash = crypto.createHash("md5").update(email).digest("hex");
  console.log(emailHash);
  const avatarURL = gravatar.url(emailHash);

  const newUser = await User.create({
    ...req.body,
    password: passwordHash,
    avatarURL,
  });
  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = { id: user._id };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  res.status(200).json({
    email,
    subscription,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json({
    message: "No Content",
  });
};

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;

  if (!["starter", "pro", "business"].includes(subscription)) {
    throw HttpError(400, "Invalid subscription type");
  }

  const updateUser = await User.findByIdAndUpdate(
    _id,
    { subscription },
    { new: true }
  );

  res.status(200).json({
    email: updateUser.email,
    subscription: updateUser.subscription,
  });
};

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  // Resize image
  const image = await Jimp.read(tempUpload);
  await image.resize(250, 250).write(tempUpload);
  // Create new name
  const filename = `${_id}_${originalname}`;
  const newUpload = path.join(avatarsDir, filename);
  await fs.rename(tempUpload, newUpload);
  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({
    avatarURL,
  });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateSubscription: ctrlWrapper(updateSubscription),
  updateAvatar: ctrlWrapper(updateAvatar),
};
