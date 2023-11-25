import express from "express";
import path from "path";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

mongoose.connect("mongodb://127.0.0.1:27017", {
  dbName: "projbackend",
}).then(() => console.log("Database Connected"))
  .catch((e) => console.log(e));



const messageSchema=new mongoose.Schema({
    question:String,
    options:String,
    correctAnswer:String,
});

const Message=mongoose.model("&questions",messageSchema);

const app=express();
const users=[];
app.set("view engine","ejs");
app.use(express.static(path.join(path.resolve(),"public")));
app.use(express.urlencoded({extended:true}));
app.get("/",(req,res)=>{
   res.render("question");
});
  app.get("/ques",(req,res)=>{
       res.render("madeques");
  });


app.get("/users",(req,res)=>{
    res.json({
        users,
    });
});


app.post("/contact",async(req,res)=>{
    const {question,options,correctAnswer}=req.body;
   await Message.create({question,options,correctAnswer});
    res.render("question");
});

app.listen(9000,()=>{
    console.log("server is working");
})

// Route to fetch and print messages to the console
app.get("/messages", async (req, res) => {
try {
  const messages = await Message.find();
  
  // Print messages to the console
  console.log(messages);

  res.json(messages);
} catch (error) {
  console.error("Error fetching messages:", error);
  res.status(500).send("Internal Server Error");
}
});


app.get("/back/views/madeques.ejs", (req,res) => {
res.render("success");
});

const msg = mongoose.model("True&False", messageSchema);

// User Schema for Student
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});





const a = express();

//using middle ware

a.use(express.static(path.join(path.resolve(),"public")));
a.use(express.urlencoded({extended : true}));

a.set("view engine","ejs");

a.get("/", (req,res) => {
      res.render("true");
});

a.get("/add", (req,res) => {
    res.send("Nice");
});

a.get("/success", (req,res) => {
    res.render("success");
});
// a.post("/contact",async(res,req)=>{
//    res.render("noOfques");
// });
a.post("/contact",async (req,res) => {
  const { question,options,correctAnswer} = req.body;
  await msg.create({question,options,correctAnswer});
  res.render("true");
});

a.listen(5000,() => {
    console.log("Server is running");
});

const User = mongoose.model("User&data", userSchema);

// Admin Schema
const adminUserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const AdminUser = mongoose.model("Admin&data", adminUserSchema);


// Student Routes

const studentApp = express();

studentApp.use(express.static(path.join(path.resolve(), "public")));
studentApp.use(express.urlencoded({ extended: true }));
studentApp.use(cookieParser());

studentApp.set("view engine", "ejs");

const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    const decoded = jwt.verify(token, "sdjasdbajsdbjasd");
    req.user = await User.findById(decoded._id);
    next();
  } else {
    res.redirect("/login");
  }
};

studentApp.get("/", isAuthenticated, (req, res) => {
  res.render("studentUI", { name: req.user.name });
});

studentApp.get("/select", isAuthenticated, (req, res) => {
  res.render("select");
});

studentApp.get("/login", (req, res) => {
  res.render("login");
});

studentApp.get("/register", (req, res) => {
  res.render("register");
});

studentApp.get("/ques1", isAuthenticated, (req, res) => {
  res.render("ques1");
});

studentApp.post("/login", async (req, res) => {
  const { email, password } = req.body;

  let user = await User.findOne({ email });

  if (!user) return res.redirect("/register");

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch)
    return res.render("login", { email, message: "Incorrect Password" });

  const token = jwt.sign({ _id: user._id }, "sdjasdbajsdbjasd");

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 60 * 1000),
  });
  res.redirect("/");
});

studentApp.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  let user = await User.findOne({ email });
  if (user) {
    return res.redirect("/login");
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign({ _id: user._id }, "sdjasdbajsdbjasd");

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 60 * 1000),
  });
  res.redirect("/");
});

studentApp.get("/logout", (req, res) => {
  res.cookie("token", null, {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.redirect("/");
});

studentApp.listen(17000, () => {
  console.log("Student server is working");
});

// Admin Routes

const adminApp = express();

adminApp.use(express.static(path.join(path.resolve(), "public")));
adminApp.use(express.urlencoded({ extended: true }));
adminApp.use(cookieParser());

adminApp.set("view engine", "ejs");

const isAdminAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    const decoded = jwt.verify(token, "sdjasdbajsdbjasd");
    req.user = await AdminUser.findById(decoded._id);
    next();
  } else {
    res.redirect("/loginadmin");
  }
};

adminApp.get("/", isAdminAuthenticated, (req, res) => {
  res.render("adminUI", { name: req.user.name });
});

adminApp.get("/selectAdmin", isAdminAuthenticated, (req, res) => {
  res.render("selectAdmin");
});

adminApp.get("/loginadmin", (req, res) => {
  res.render("loginadmin");
});

adminApp.get("/registeradmin", (req, res) => {
  res.render("registeradmin");
});

adminApp.get("/question", isAdminAuthenticated, (req, res) => {
  res.render("question");
});

adminApp.post("/loginadmin", async (req, res) => {
  const { email, password } = req.body;

  let user = await AdminUser.findOne({ email });

  if (!user) return res.redirect("/registeradmin");

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch)
    return res.render("loginadmin", { email, message: "Incorrect Password" });

  const token = jwt.sign({ _id: user._id }, "sdjasdbajsdbjasd");

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 60 * 1000),
  });
  res.redirect("/");
});

adminApp.post("/registeradmin", async (req, res) => {
  const { name, email, password } = req.body;

  let user = await AdminUser.findOne({ email });
  if (user) {
    return res.redirect("/loginadmin");
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  user = await AdminUser.create({
    name,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign({ _id: user._id }, "sdjasdbajsdbjasd");

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 60 * 1000),
  });
  res.redirect("/");
});

adminApp.get("/logout", (req, res) => {
  res.cookie("token", null, {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.redirect("/");
});

adminApp.listen(7700, () => {
  console.log("Admin server is working");
});
