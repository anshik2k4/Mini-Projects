const express = require("express");
const app = express();

const port = 3000;

// Defining paths
const path = require("path");

app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// Importing uuid package
const { v4: uuidv4 } = require("uuid");

// Method override
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

// Posts
let array = [
    {
        username: "Anshik",
        content: "A Content creater",
        id: uuidv4()
    },
    {
        username: "Raman",
        content: "A Video Gamer",
        id: uuidv4()
    },
    {
        username: "Rohan",
        content: "A Proffessional Singer",
        id: uuidv4()
    }
];

// Home
app.get("/", (req, res) => {
    res.redirect("/posts");
});

// Show all posts
app.get("/posts", (req, res) => {
    res.render("quora.ejs", { array });
});

// New post form
app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

// Create new post
app.post("/posts", (req, res) => {
    let { username, content } = req.body;
    let id = uuidv4();

    array.push({
        username,
        content,
        id
    });

    res.redirect("/posts");
});

// Show specific post
app.get("/posts/:id", (req, res) => {
    let { id } = req.params;

    let post = array.find((p) => {
        return p.id === id;
    });

    res.render("detail.ejs", { post });
});

// Edit post page
app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;

    let post = array.find((p) => {
        return p.id === id;
    });

    res.render("edit.ejs", { post });
});

// Update post
app.patch("/posts/:id", (req, res) => {
    let { newcontent } = req.body;
    let { id } = req.params;

    let post = array.find((p) => {
        return p.id === id;
    });

    post.content = newcontent;

    res.redirect("/posts");
});

// Delete post
app.delete("/posts/:id/delete", (req, res) => {
    const { id } = req.params;

    array = array.filter((p) => p.id !== id);

    res.redirect("/posts");
});

// Start server
app.listen(port, "0.0.0.0", () => {
    console.log(`App is listening on port ${port}`);
});