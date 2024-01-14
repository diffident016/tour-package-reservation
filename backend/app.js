const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const session = require('cookie-session')
require('./passport.js')
const passport = require("passport");


require("dotenv").config();

const app = express();

//Define the port
const port = process.env.PORT || 5000;

app.use(
  session({ name: "session", keys: ["diffident016.tracc"], maxAge: 24 * 60 * 60 * 100 })
);

const regenerate = callback => {
  console.log('regenerating')
  callback()
}
const save = callback => {
  console.log('saving')
  callback()
}
app.use((req, res, next) => {
  req.session.regenerate = regenerate
  req.session.save = save
  next()
})

app.use(passport.initialize());
app.use(passport.session());

//Allow CORS
app.use(cors({
  origin: "http://localhost:3000",
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
}));

//Initialize Body Parser
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

//Import Routes
const usersRoute = require("./routes/users");
const signupRoute = require("./routes/signup");
const guestRoute = require("./routes/guest");
const viewRoute = require("./routes/view");
const authRoute = require("./routes/auth");
//Use Routes
app.use("/users", usersRoute);
app.use("/signup", signupRoute);
app.use("/guest", guestRoute);
app.use("/view", viewRoute);
app.use("/auth", authRoute);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

//Database Connection
mongoose
  .connect(
    process.env.DB,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Database Connected Successfully!");
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(port, () => {
  console.log("Server Started on port ", port);
});
