const express = require("express");
const fruits = require("./models/fruits");
const vegetables = require("./models/vegetables");
const app = express();
const port = 3000;

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

app.get("/fruits", function (req, res) {
  res.render("fruits/Index", { fruits: fruits });
});

app.get("/vegetables", function (req, res) {
  res.render("vegetables/IndexVeg", { vegetables: vegetables });
  console.log({vegetables:vegetables})
});

//////

app.get("/fruits/new", (req, res) => {
  res.render("fruits/NEW");
});

app.get("/vegetables/new", (req, res) => {
  res.render("vegetables/New");
});

//////

// app.get("/fruits/:indexOfFruitsArray", (req, res) => {
//   res.send(fruits[req.params.indexOfFruitsArray]);
// });

app.get("/fruits/:indexOfFruitsArray", function (req, res) {
  res.render("fruits/Show", {
    //second param must be an object
    fruit: fruits[req.params.indexOfFruitsArray], //there will be a variable available inside the ejs file called fruit, its value is fruits[req.params.indexOfFruitsArray]
  });
});


app.get("/vegetables/:indexOfVegetablesArray", function (req, res) {
  res.render("vegetables/ShowVeg", {
    //second param must be an object
    vegetables: vegetables[req.params.indexOfVegetablesArray],
  });
});

/////////

//Post
app.post("/fruits", (req, res) => {
  if (req.body.readyToEat === "on") {
    //if checked, req.body.readyToEat is set to 'on'
    req.body.readyToEat = true;
  } else {
    //if not checked, req.body.readyToEat is undefined
    req.body.readyToEat = false;
  }
  fruits.push(req.body);
  console.log(fruits);
  res.redirect("/fruits"); //send the user back to /fruits
});

app.post("/vegetables", (req, res) => {
  if (req.body.readyToEat === "on") {
    //if checked, req.body.readyToEat is set to 'on'
    req.body.readyToEat = true;
  } else {
    //if not checked, req.body.readyToEat is undefined
    req.body.readyToEat = false;
  }
  vegetables.push(req.body);
  console.log(vegetables);
  res.redirect("/vegetables"); //send the user back to /fruits
});

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
