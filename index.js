const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { send } = require("process");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");

// Method Override for delete and patch/put request
app.use(methodOverride("_method"));

// Post Encoded Data
app.use(express.urlencoded({ extended: true }));

// Views File Access
app.set("views engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Public File Access
app.use(express.static(path.join(__dirname, "public")));

let posts = [
  {
    id: uuidv4(),
    username: "Pranjal",
    content: "I Love Coding",
  },
  {
    id: uuidv4(),
    username: "Baby",
    content: "I Hate Coding",
  },
  {
    id: uuidv4(),
    username: "Sahil",
    content: "I Love and also Hate Coding",
  },
];

// Index Page / Home Page
app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

// Add New Post
app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

// Create Post is Showing
app.post("/posts", (req, res) => {
  let { username, content } = req.body;
  let id = uuidv4();
  posts.push({ id, username, content });
  res.redirect("/posts");
});

// Showing Single Page with id
app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("show.ejs", { post });
});

// Patch / Update
app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newContent = req.body.content;
  let post = posts.find((p) => id === p.id);
  post.content = newContent;
  res.redirect("/posts");
});

// Edit / Update
app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("edit.ejs", { post });
});

// Delete
app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  posts = posts.filter((p) => id !== p.id);
  res.redirect("/posts");
});

// Port Working Status
app.listen(port, () => {
  console.log(`App is start at ${port}`);
});
