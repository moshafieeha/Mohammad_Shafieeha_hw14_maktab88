const { error } = require("console");
const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
let products = require("../db/products-data.json");

////////////////////////////// CREATE //////////////////////////////

router.post("/create", function (req, res) {
  // validation
  // check null object
  if (Object.keys(req.body).length === 0) {
    console.error(error);
    return res.status(406).send("Not acceptable, null object recieved.");
  }

  // sanitization
  const pattern = [
    "id",
    "title",
    "price",
    "rating",
    "stock",
    "brand",
    "category",
  ];

  // check the right length of object
  if (pattern.length !== Object.keys(req.body).length) {
    return res.status(406).send("Not acceptable, properties are not match.");
  }

  // check the null value and right properties
  for (const key in req.body) {
    if (!req.body[key] || !pattern.includes(key))
      return res.status(406).send(`Not acceptable, invalid input (${key})`);
  }

  // check the value of id property
  if (typeof req.body.id !== "number")
    return res.status(406).send("Not acceptable, Invalid user id.");

  // check duplication
  const duplicateProduct = products.find((x) => x.id === req.body.id);
  if (!!duplicateProduct)
    return res.status(409).send("Conflict, product already exists.");

  products.push(req.body);

  try {
    fs.writeFileSync(
      path.join(__dirname, "../db/products-data.json"),
      JSON.stringify(products)
    );
  } catch (error) {
    console.log(error);
    return res.status(500).send("Can not be accomplished now");
  }

  return res.status(200).send('Done');
});

////////////////////////////// READ //////////////////////////////

router.get("/read", function (req, res) {
  return res.json(products);
});

router.get("/read/:productID", function (req, res) {
  try {
    const targetProduct = products.find((x) => x.id == req.params.productID);
    if (!targetProduct) {
      return res.status(404).send("Not found!");
    }

    return res.json(targetProduct);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Can not be accomplished");
  }
});

////////////////////////////// UPDATE //////////////////////////////

router.put("/update/:productID", function (req, res) {
  // validation
  // check null object
  if (Object.keys(req.body).length === 0) {
    console.error(error);
    return res.status(406).send("Not acceptable, null object recieved.");
  }
  // check existing
  const targetProduct = products.find((x) => x.id == req.params.productID);
  if (!targetProduct)
    return res
      .status(404)
      .send(`Product (id: ${req.params.productID}) not found!`);

  // sanitization
  const pattern = [
    "id",
    "title",
    "price",
    "rating",
    "stock",
    "brand",
    "category",
  ];

  // check the value of id property
  if (typeof req.body.id !== "number")
    return res.status(406).send("Not acceptable, Invalid user id.");

  // check the right length of object
  if (pattern.length !== Object.keys(req.body).length) {
    return res.status(406).send("Not acceptable, properties are not match.");
  }

  // check the null value and right properties
  for (const key in req.body) {
    if (!req.body[key] || !pattern.includes(key))
      return res.status(406).send(`Not acceptable, invalid input (${key})`);
  }

  // check duplication
  if (req.params.productID !== req.body.id) {
    const duplicateUser = products.find((x) => x.id === req.body.id);
    if (!!duplicateUser)
      return res.status(409).send("Conflict, product already exists.");
  }

  try {
    // update user data

    products = products.map((x) => {
      if (x.id == req.params.productID) {
        return { ...x, ...req.body };
      }
      return x;
    });

    fs.writeFileSync(
      path.join(__dirname, "../db/products-data.json"),
      JSON.stringify(products)
    );

    return res.status(200).send("Product is updated.");
  } catch (error) {
    console.error(error);
    return res.status(400).send("Can not be accomplished");
  }
});

////////////////////////////// DELETE //////////////////////////////

router.delete("/remove/:productID", function (req, res) {
  const productsTemp = products.filter((x) => x.id != req.params.productID);

  try {
    fs.writeFileSync(
      path.join(__dirname, "../db/products-data.json"),
      JSON.stringify(productsTemp)
    );
  } catch (error) {
    console.error(error);
    return res.status(400).send("Can not be accomplished");
  }

  return res.send("Product removed successfully.");
});

module.exports = router;

//fault in json, such as lack of ","
// checking the type of value for every inputs

//error returning function, json
