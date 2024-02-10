const { HttpError } = require("../helpers");

const isFileExist = (req, res, next) => {
  console.log(req.file);
  if (!req.file) {
    next(HttpError(400, ` Must add file`));
  }
  next();
};

module.exports = isFileExist;
