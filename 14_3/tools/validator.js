let users = require("../db/users-data.json");
let errorMessages = [];

// check being empty
const isEmpty = (field) => {
  return (req, res, next) => {
    if (!req.body[field]) {
      errorMessages.push(`${field} IsEmpty`);
    }
    next();
  };
};

// check the validatin of password
const validPassword = function () {
  return (req, res, next) => {
    const pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (req.body.password && !pattern.test(req.body.password)) {
      errorMessages.push("Password is not proper.");
    }
    next();
  };
};

// check the validatin of password
const validUsername = function () {
  return (req, res, next) => {
    // pattern
    const pattern = /^[a-zA-Z0-9]+([_ -]?[a-zA-Z0-9])*$/;
    if (req.body.username && !pattern.test(req.body.username)) {
      errorMessages.push("Username is not proper.");
    }

    // check duplication
    const duplicateUsername = users.find(
      (x) => x.username === req.body.username
    );
    if (!!duplicateUsername) errorMessages.push("Username is already taken.");

    next();
  };
};

// reset the error messages
const resetMessages = function () {
  return (req, res, next) => {
    errorMessages = [];
    console.log('done');
    next();
  };
};

module.exports = {
  errorMessages,
  resetMessages,
  isEmpty,
  validPassword,
  validUsername,
};
