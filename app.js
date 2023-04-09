const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

var items = ["buy food", "cook food", "eat food"];
var workItems = [];

app.get("/", function (req, res) {
  var today = new Date();

  var options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  var day = today.toLocaleDateString("en-US", options);

  res.render("list", { listTitle: day, newItemList: items });
});

app.post("/", function (req, res) {
  var item = req.body.newItem;
  if(req.body.list === "Work"){
    workItems.push(item);
    res.redirect("/work");
  }
  
  items.push(item);
  res.redirect("/");
});

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", newItemList: workItems });
});

app.post("/work",function(req,res){
  var item=req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
})

app.listen("3000", function () {
  console.log("server started at port 3000");
});
