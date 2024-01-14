const express = require("express");
const router = express.Router();
const Auth = require("../models/Authmodel");
var randomstring = require("randomstring");
const passport = require("passport");

const CLIENT_URL = "http://localhost:3000/";

router.get("/login/success", (req, res) => {

  console.log(req.user)
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      username: req.user,
      authToken: randomstring.generate()
    });
  } else {
    res.status(401).json({
      success: false,
      message: "error"
    })
  }
});

//POST
router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const searchUser = await Auth.find({ password: req.body.adminPassword, userEmail: req.body.adminEmail });
    console.log(searchUser);
    let Authresponse = {
      'username': searchUser[0].userName,
      'authToken': randomstring.generate()
    }
    console.log(Authresponse);
    res.json(Authresponse)
  } catch (err) {
    res.status(404).json({ message: err });
  }

});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.redirect(CLIENT_URL);
  });
});

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

router.get("/facebook", passport.authenticate("facebook"));

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);


module.exports = router;
