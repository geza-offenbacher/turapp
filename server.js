const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");
const hikes = require("./routes/api/hikes");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = require("./config/keys").mongoURI;


mongoose
  .connect(db)
  .then(() => console.log("Adatbázis csatlakoztatva"))
  .catch(err => console.log("Adatbázishoz nem sikerült csatlakozni"));

app.use(passport.initialize());

require("./config/passport")(passport);

app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);
app.use("/api/hikes", hikes);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Szerver fut a következő porton: ${port}`));
