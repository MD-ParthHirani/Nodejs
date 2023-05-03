const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const app = express();

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/userlogin',
{
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

app.set("view engine", "ejs");

app.use(require("express-session")({
    secret: "Rusty is a dog",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());



const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function(){
    console.log("connected successfully");
});

app.use(router);
app.listen(8081, () =>{
    console.log("server is running at port 8081");
});
