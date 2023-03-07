const express = require("express");
const app = express();
const {
  errorMessages,
  resetMessages,
  isEmpty,
  validPassword,
  validUsername,
} = require("./tools/validator");
const fs = require("fs");
const path = require("path");

let users = require("./db/users-data.json");

////////////////////////////// Middleware //////////////////////////////

// fetch body of reqs as req.body
app.use(express.json());

// encode info from url
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

// // instead of validation in req handler, we can check in middlewares
// app.use('/user', function (req, res, next) {
//   console.log("middleware");
//   // dont send a responde in middlewares.

//   // app.use(express.json()) like this:
//   req.validation = false
//   next();
// });

////////////////////////////// Routes //////////////////////////////

// Route - request handler (cb)
app.post(
  "/user",
  isEmpty("firstname"),
  isEmpty("lastname"),
  isEmpty("password"),
  isEmpty("username"),
  isEmpty("gender"),
  validPassword(),
  validUsername(),
  function (req, res) {
    if (errorMessages.length !== 0) {
      return res.status(400).send(errorMessages);
    }
    
    users.push(req.body);

    try {
      fs.writeFileSync(
        path.join(__dirname, "./db/users-data.json"),
        JSON.stringify(users)
      );
    } catch (error) {
      console.log(error);
      return res.status(500).send("Can not be accomplished now");
    }

    return res.status(200).send("User created successfully");
  }
);

app.listen(8100, () => console.log("listen on 8100"));
