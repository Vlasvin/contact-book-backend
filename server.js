const mongoose = require("mongoose");

const DB_HOST =
  "mongodb+srv://vlasvin:5s7zPfhALGRsIc8R@cluster0.bv7htjb.mongodb.net/contacts_reader?retryWrites=true&w=majority";

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000);
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
