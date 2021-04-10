var express = require("express");
const userHelpers = require("../helpers/userHelpers");
var router = express.Router();
//var schema1 = require("../models/todoschema");
var todoElement;
const session = require("express-session");
//veryfy login
const veryfylogging = (req, res, next) => {
  if (req.session.user) {
    userHelpers.data(req.session.user._id).then((todoElements) => {
      todoElement = todoElements;
    });
    next();
  } else {
    res.render("login", { user: false });
  }
};

//console.log(session.todo);
/* GET home page. */
router.get("/register", function (req, res, next) {
  res.render("register");
});
router.post("/signup", (req, res, next) => {
  userHelpers
    .doSignUp(req.body)
    .then((response) => {
      req.session.user = response;
      req.session.logIn = true;
      if (req.session.user) {
        userHelpers.data(req.session.user._id).then((todoElements) => {
          //console.log(todoElements);
          todoElement = todoElements;

          res.render("todo", { user: true, todoElement });
        });
      }
    })
    .catch((err) => {
      res.render("register", { mailCkeck: true });
      console.log("dede");
    });
});
router.get("/", veryfylogging, (req, res) => {
  res.render("todo", { user: true, todoElement });
});
router.post("/login", (req, res) => {
  userHelpers
    .doSignin(req.body)
    .then((response) => {
      if (response) {
        req.session.user = response;
        req.session.logIn = true;
        if (req.session.user) {
          userHelpers.data(req.session.user._id).then((todoElements) => {
            // console.log(todoElements);
            todoElement = todoElements;

            res.render("todo", { user: true, todoElement });
          });
        }
      } else {
        req.session.logErr = true;
        res.render("login", { passCheker: "incorrect pass" });
      }
    })
    .catch((err) => {
      req.session.logErr = true;
      res.render("login", { userCheker: "no user found" });
    });
});
router.post("/todoSave",  veryfylogging,(req, res, next) => {
  userHelpers
    .addTodo(req.body.todoitem, req.session.user._id)
    .then((status) => {
      console.log("success");
      if (req.session.user) {
        userHelpers.data(req.session.user._id).then((todoElements) => {
          // console.log(todoElements);
          todoElement = todoElements;
          res.render("todo", { user: true, todoElement });
        });
      }
    });
});
router.post("/removeTodo", veryfylogging, async (req, res) => {
  console.log(req.body.idspecifier);
  await userHelpers.removeTodo(req.body.idspecifier).then((status) => {
    if (req.session.user) {
      userHelpers.data(req.session.user._id).then((todoElements) => {
        // console.log(todoElements);
        todoElement = todoElements;
        res.render("todo", { user: true, todoElement });
      });
    }
  });
});
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});
module.exports = router;
