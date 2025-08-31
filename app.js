
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressErrors.js");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const listingRouter = require ("./routes/listing.js");
const reviewRouter = require ("./routes/review.js");
const userRouter = require ("./routes/user.js");


const dbUrl = process.env.ATLASDB_URL;

main()
.then(() => {
  console.log("Connected to MongoDB");
})
.catch((err) => {
  console.error("Error connecting to MongoDB:", err);
});

async function main() {
    await mongoose.connect(dbUrl);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));



const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
  secret: process.env.SECRETE,
  },
  touchAfter: 24 * 3600, // time period in seconds
});

store.on("error", (error) => {
  console.log("Session store error:", error);
});

const sessionOptions = {
  store: store,
  secret: process.env.SECRETE,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 1000, // 7 days
    maxAge: 7 * 24 * 60 * 1000, // 7 days
    httpOnly: true,
  },
};



// app.get("/", (req, res) => {
//   res.send("Welcome to the WanderLust API");
// });



app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
res.locals.success = req.flash("success");
res.locals.error = req.flash("error");
res.locals.currUser = req.user;
next();
});


// app.get("/demouser", async (req, res) => {
//   let fakeUser = new User({
//     email: "demo@example.com",
//     username: "demoUser",
//   });
//   let registeredUser = await User.register(fakeUser, "helloworld");
//   res.send(registeredUser);
// });




app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

app.use((req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});


app.use((err, req, res, next) => {
  let{statusCode=500,message="Something went wrong"} = err;
  res.status(statusCode).render("error.ejs", {message});
  // res.status(statusCode).send(message);
});


app.listen(8080, () => {
  console.log("Server is running on port 8080");
});