const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(express.static("public"));

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let posts = [];


app.get("/login", (req, res) => {
    res.render("login");
  });
  
  app.get("/signup", (req, res) => {
    res.render("signup");
  });
  
  
app.get("/", (req, res) => {
  res.render("home", { posts });
});



app.get("/new", (req, res) => {
  res.render("new-post");
});

app.post("/new", (req, res) => {
  const { title, content } = req.body;
  posts.push({ title, content });
  res.redirect("/");
});

app.get("/edit/:index", (req, res) => {
  const index = req.params.index;
  res.render("edit-post", { post: posts[index], index });
});

app.post("/edit/:index", (req, res) => {
  const index = req.params.index;
  posts[index] = {
    title: req.body.title,
    content: req.body.content
  };
  res.redirect("/");
});

app.post("/delete/:index", (req, res) => {
  const index = req.params.index;
  posts.splice(index, 1);
  res.redirect("/");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

