const mysql = require("mysql2");
const { faker } = require("@faker-js/faker");
const express = require("express");
const path = require("path");
const session = require("express-session");

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'demo_app',
  password: "anshikkr@2006725"
});

let app = express();
let port = 3000;

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "/views"));

// Session setup
app.use(session({
  secret: "employee_secret_key",
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 } // 1 ghanta
}));

app.listen(port, () => {
  console.log(`App is listening on port ${port}.`);
});

// ─── Middleware: Login check ───────────────────────────────────────────────────
function isLoggedIn(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  }
  res.redirect("/login");
}

// ─── Root redirect ─────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.redirect("/login");
});

// ─── LOGIN ─────────────────────────────────────────────────────────────────────
app.get("/login", (req, res) => {
  if (req.session.user) return res.redirect("/home");
  res.render("login.ejs", { error: null });
});

app.post("/login", (req, res) => {
  let { email, password } = req.body;

  if (!email?.trim() || !password?.trim()) {
    return res.render("login.ejs", { error: "All fields are required" });
  }

  let q = "SELECT * FROM datauser WHERE email = ? AND password = ?";
  connection.query(q, [email, password], (err, results) => {
    if (err) return res.render("login.ejs", { error: "Server error,try again" });

    if (results.length === 0) {
      return res.render("login.ejs", { error: "Email ya password galat hai!" });
    }

    req.session.user = {
      userid: results[0].userid,
      username: results[0].username,
      email: results[0].email
    };
    res.redirect("/home");
  });
});

// ─── SIGNUP ────────────────────────────────────────────────────────────────────
app.get("/signup", (req, res) => {
  if (req.session.user) return res.redirect("/home");
  res.render("signup.ejs", { error: null });
});

app.post("/signup", (req, res) => {
  let { username, email, password } = req.body;

  if (!username?.trim() || !email?.trim() || !password?.trim()) {
    return res.render("signup.ejs", { error: "All fields are required" });
  }

  // Check karo email ya username pehle se exist karta hai
  let checkQ = "SELECT * FROM datauser WHERE email = ? OR username = ?";
  connection.query(checkQ, [email, username], (err, results) => {
    if (err) return res.render("signup.ejs", { error: "Server error,  try again" });

    if (results.length > 0) {
      return res.render("signup.ejs", { error: "Email or username already registered " });
    }

    let id = faker.string.uuid();
    let insertQ = "INSERT INTO datauser (userid, username, email, password) VALUES (?, ?, ?, ?)";
    connection.query(insertQ, [id, username, email, password], (err) => {
      if (err) return res.render("signup.ejs", { error: "Account not created, try again." });

      req.session.user = { userid: id, username, email };
      res.redirect("/home");
    });
  });
});

// ─── LOGOUT ────────────────────────────────────────────────────────────────────
app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

// ─── HOME ──────────────────────────────────────────────────────────────────────
app.get("/home", isLoggedIn, (req, res, next) => {
  let total = 'SELECT count(userid) FROM datauser';
  connection.query(total, (err, result) => {
    if (err) return next(err);
    let users = result[0]["count(userid)"];
    res.render("home.ejs", { users, currentUser: req.session.user });
  });
});

// ─── SHOW ALL USERS ────────────────────────────────────────────────────────────
app.get("/home/user", isLoggedIn, (req, res, next) => {
  let q = 'SELECT * FROM datauser';
  connection.query(q, (err, users) => {
    if (err) return next(err);
    res.render("show.ejs", { users, currentUser: req.session.user });
  });
});

// ─── ADD USER ──────────────────────────────────────────────────────────────────
app.get("/home/user/add", isLoggedIn, (req, res) => {
  res.render("add.ejs", { currentUser: req.session.user });
});

app.post("/home/user", isLoggedIn, (req, res, next) => {
  let { username: name, email: mail, password: pass } = req.body;

  if (!name?.trim() || !mail?.trim() || !pass?.trim()) {
    return res.status(400).send("All filed are required!");
  }

  let id = faker.string.uuid();
  let details = "INSERT INTO datauser (userid, username, email, password) VALUES (?, ?, ?, ?)";
  connection.query(details, [id, name, mail, pass], (err) => {
    if (err) return next(err);
    res.redirect("/home/user");
  });
});

// ─── EDIT USER ─────────────────────────────────────────────────────────────────
app.get("/home/user/:id", isLoggedIn, (req, res, next) => {
  let { id } = req.params;
  let q = 'SELECT * FROM datauser WHERE userid=?';
  connection.query(q, [id], (err, users) => {
    if (err) return next(err);
    res.render("edit.ejs", { info: users[0], currentUser: req.session.user });
  });
});

app.post("/home/user/:id", isLoggedIn, (req, res, next) => {
  let { username: name, password: pass } = req.body;
  let { id } = req.params;

  let userpass = 'SELECT password FROM datauser WHERE userid=?';
  connection.query(userpass, [id], (err, result) => {
    if (err) return next(err);

    if (result[0].password !== pass) {
      return res.send("wrong password!");
    }

    let q = 'UPDATE datauser SET username=? WHERE userid=?';
    connection.query(q, [name, id], (err) => {
      if (err) return next(err);
      res.redirect("/home/user");
    });
  });
});

// ─── DELETE USER ───────────────────────────────────────────────────────────────
app.get("/home/user/:id/delete", isLoggedIn, (req, res, next) => {
  let { id } = req.params;
  let q = 'SELECT * FROM datauser WHERE userid=?';
  connection.query(q, [id], (err, users) => {
    if (err) return next(err);
    res.render("delete.ejs", { info: users[0], currentUser: req.session.user });
  });
});

app.post("/home/user/:id/delete", isLoggedIn, (req, res, next) => {
  let { password: pass } = req.body;
  let { id } = req.params;

  let userpass = 'SELECT password FROM datauser WHERE userid=?';
  connection.query(userpass, [id], (err, result) => {
    if (err) return next(err);

    if (result[0].password !== pass) {
      return res.send("wrong password!");
    }

    let q = 'DELETE FROM datauser WHERE userid = ?';
    connection.query(q, [id], (err) => {
      if (err) return next(err);
      res.redirect("/home/user");
    });
  });
});

// ─── Error Handler ─────────────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  let { status = 500, message = "Something went wrong" } = err;
  res.status(status).send(message);
});

app.use((req, res) => {
  res.send("Page not found");
});