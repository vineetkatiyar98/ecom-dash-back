const express = require("express");
const cors = require("cors");
require("./db/config");
require("dotenv").config();
require("dotenv").config();
const User = require("./db/User");
const Product = require("./db/product");
const app = express();
const port = process.env.PORT || 8000;
app.use(express.json());
app.use(cors());

app.post("/register", async (req, resp) => {
  try{
    let user = new User(req.body);
    let result = await user.insertOne();
    result = result.toObject();
    delete result.password;
    resp.status(200).json(result);
  }catch(e){
    console.log(e)
    resp.status(500).send(e);
  }
});

app.post("/login", async (req, resp) => {
try{
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      if (user) {
        resp.json(user);
      }
    } else {
      resp.json({ result: "No User found" });
    }
  } else {
    resp.json({ result: "No User found" });
  }
}catch(e){
  resp.status(500).json(e);
}
});

app.post("/add-product", async (req, resp) => {
  try{
    let product = new Product(req.body);
    let result = await product.save();
    resp.json(result);
  }
  catch(e){
  resp.status(500).json(e);

  }
});

app.get("/products", async (req, resp) => {
try{
  const products = await Product.find();
  if (products.length > 0) {
      resp.json(products)
  } else {
      resp.json({ result: "No Product found" })
  }
}  catch(e){
  resp.status(500).json(e);

  }
});;

app.delete("/product/:id", async (req, resp) => {
  try{
    let result = await Product.deleteOne({ _id: req.params.id });
    resp.json(result)
  } catch(e){
    resp.status(500).json(e.message);
  
    }
}),


app.get("/product/:id", async (req, resp) => {
try{
  let result = await Product.findOne({ _id: req.params.id })
  if (result) {
      resp.json(result)
  } else {
      resp.json({ "result": "No Record Found." })
  }
}
catch(e){
  resp.status(500).json(e);
  }
})


app.put("/product/:id", async (req, resp) => {
try{
  let result = await Product.updateOne(
    { _id: req.params.id },
    { $set: req.body }
)
resp.json(result)
}catch(e){
  resp.status(500).json(e);
  }
});

app.put("/product/:id", async (req, resp) => {
  try{
    let result = await Product.updateOne(
      { _id: req.params.id },
      { $set: req.body }
  )
  resp.json(result)
  }catch(e){
  resp.status(500).json(e);
  }
});

app.get("/search/:key", async (req, resp) => {
try{
  let result = await Product.find({
    "$or": [
        {
            name: { $regex: req.params.key }
        },
        {
            company: { $regex: req.params.key }
        },
        {
            category: { $regex: req.params.key }
        }
    ]
});
resp.json(result);
}
catch (e) {
  resp.status(500).json(e);
}
})

app.listen(port, () => {
  console.log(`server running on the port ${port}`);
});
