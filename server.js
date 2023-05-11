const express = require("express");
const Fruit = require("./models/fruits");
const vegetables = require("./models/vegetables");
const app = express();
const port = 3000;

const mongoose = require("mongoose");

require('dotenv').config()

//... and then farther down the file
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once("open", () => {
  console.log("connected to mongo");
});




//middleware should be before your routes
app.use((req, res, next) => {
  console.log("I run for all routes");
  next();
});
//allows us to see user input
app.use(express.urlencoded({ extended: false }));

/////

//view engine instantiation
app.set("view engine", "jsx");
app.engine("jsx", require("jsx-view-engine").createEngine());

//routes
//////
// app.get('/vegetables/', (req,res)=>{
//   res.send(vegetables)
// })

// app.get("/fruits/", (req, res) => {
//   res.send(fruits);
// });

//////

app.get("/fruits", (req, res) => {
  Fruit.find({}, (error, allFruits) => {
    res.render("fruits/Index", {
      fruits: allFruits,
    });
  });
});

// app.get("/vegetables", function (req, res) {
//   res.render("vegetables/IndexVeg", { vegetables: vegetables });
//   console.log({vegetables:vegetables})
// });

//////

app.get("/fruits/new", (req, res) => {
  res.render("fruits/New");
});

// app.get("/vegetables/new", (req, res) => {
//   res.render("vegetables/New");
// });

//////

// app.get("/fruits/:indexOfFruitsArray", (req, res) => {
//   res.send(fruits[req.params.indexOfFruitsArray]);
// });

app.get("/fruits/:id", (req, res) => {
  Fruit.findById(req.params.id, (err, foundFruit) => {
    res.render("fruits/Show", {
      fruit: foundFruit,
    });
  });
});

// app.get("/vegetables/:indexOfVegetablesArray", function (req, res) {
//   res.render("vegetables/ShowVeg", {
//     //second param must be an object
//     vegetables: vegetables[req.params.indexOfVegetablesArray],
//   });
// });

/////////

//Post

//... and then farther down the file
app.post("/fruits/", (req, res) => {
  if (req.body.readyToEat === "on") {
    //if checked, req.body.readyToEat is set to 'on'
    req.body.readyToEat = true;
  } else {
    //if not checked, req.body.readyToEat is undefined
    req.body.readyToEat = false;
  }
  Fruit.create(req.body, (error, createdFruit) => {
    res.redirect("/fruits");
  });
});

// app.post("/vegetables", (req, res) => {
//   if (req.body.readyToEat === "on") {
//     //if checked, req.body.readyToEat is set to 'on'
//     req.body.readyToEat = true;
//   } else {
//     //if not checked, req.body.readyToEat is undefined
//     req.body.readyToEat = false;
//   }
//   vegetables.push(req.body);
//   console.log(vegetables);
//   res.redirect("/vegetables"); //send the user back to /fruits
// });

///////

//listener
app.listen(port, () => {
  console.log(`server is listening on ${port}`);
});

//INDUCES! Be sure to remember this acronym to keep your routes in working order! When working on a backend application, paste this to help you keep track...
// Routes...
// Index : Show all the things! - GET /fruits
// New : An empty form for a new thing - GET /fruits/new
// Delete : Get rid of this particular thing! - DELETE /fruits/:id
// Update : Update this specific thing with this updated form - PUT /fruits/:id
// Create : Make a new thing with this filled out form - POST /fruits
// Edit : A prefilled form to update a specific thing - GET /fruits/:id/edit
// Show : Show me this one thing! - GET /fruits/:id (edited)
