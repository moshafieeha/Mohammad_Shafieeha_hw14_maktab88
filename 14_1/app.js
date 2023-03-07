const express = require("express");
const app = express();
const path = require("path");

const productRouter = require("./routers/product");

////////////////////////////// Middleware //////////////////////////////

// fetch body of reqs as req.body
app.use(express.json());

// encode info from url
app.use(express.urlencoded({ extended: true }));

//CRUD
app.use("/product", productRouter);

// instead of create routs for every static file like images,we put them in a folder (public)
// and this code handle it (like it creats routs per files).
app.use(express.static("public"));

////////////////////////////// Routes //////////////////////////////

app.get("/products-page", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/index.html"));
});

app.listen(4998);
