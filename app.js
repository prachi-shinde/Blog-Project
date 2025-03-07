//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

let posts = [];
const homeStartingContent =
  "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent =
  "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent =
  "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.render("home", { StartingPara: homeStartingContent, newPosts: posts });
  //console.log(posts);
});

app.get("/posts/:postName", function (req, res) {
  
    var flag = 0;
    var postTit= "";
    var postCont = "";

  const inputParam = _.lowerCase(req.params.postName);  //lowerCase method also removes the kebab casing 


  posts.forEach(function (postt) {
    const storedTitle = _.lowerCase(postt.title);

    if (inputParam === storedTitle) {
      postTit = postt.title;
      postCont = postt.content;
      flag = 1;
    }

  });

  if (flag == 0) 
  {
    postTit = "Match not Found";
    postCont = "";
  }
  res.render("post", {postTitle : postTit, postContent : postCont});
});

app.get("/about", function (req, res) {
  res.render("about", { AboutPara: aboutContent });
});

app.get("/contact", function (req, res) {
  res.render("contact", { ContactPara: contactContent });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", function (req, res) {
  const post = {
    title: req.body.pTitle,
    content: req.body.pContent,
  };

  posts.push(post);

  res.redirect("/");
});


app.listen(3000, function () {
  console.log("Server started on port 3000");
});

//----------------------------------------------------
app.post("/compose", async (req, res) => {
  const post = {
    title: req.body.pTitle,
    content: req.body.pContent,
  };

  // posts.push(post);

  await collection.insertMany([post])


  res.redirect("/");
});
//-------------------------------------------------------

// const express = require("express");
// const bodyParser = require("body-parser");
// const ejs = require("ejs");
// const _ = require("lodash");
// const { Blog, mongoose } = require("./db/mongo")

// Blog.find({}, function (err, posts) {
//   if (err) {
//       console.log(err);
//   } else {
//       console.log(posts);
//   }
// });

// const homeStartingContent =
//   "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
// const aboutContent =
//   "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
// const contactContent =
//   "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

// const app = express();
// app.set("view engine", "ejs");
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static("public"));

// app.get("/", function (req, res) {
//   res.render("home", { StartingPara: homeStartingContent, newPosts: posts });
//   //console.log(posts);
// });

// app.get("/posts/:postName", function (req, res) {
    
//   const inputParam = _.lowerCase(req.params.postName);  //lowerCase method also removes the kebab casing 

//   Blog.find({title: inputParam}, function (err, posts) {
//       if (err) {
//           console.log(err);
//       } else {
//           var flag = 0;
//           var postTit= "";
//           var postCont = "";
//           if (posts.length) {
//               postTit = posts[0].title;
//               postCont = posts[0].content;
//               flag = 1;
//           }
//           if (flag == 0) {
//               postTit = "Match not Found";
//               postCont = "";
//           }
//           res.render("post", {postTitle : postTit, postContent : postCont});
//       }
//   });
// });

// app.get("/about", function (req, res) {
//   res.render("about", { AboutPara: aboutContent });
// });

// app.get("/contact", function (req, res) {
//   res.render("contact", { ContactPara: contactContent });
// });

// app.get("/compose", function (req, res) {
//   res.render("compose");
// });

// app.post("/compose", function (req, res) {
//   const newBlog = new Blog({
//       title: req.body.pTitle,
//       content: req.body.pContent,
//   });
//   newBlog.save().then(function () {
//       res.redirect("/");
//   }).catch(function (err) {
//       console.log(err);
//   });
// });


// app.listen(3000, function () {
//   mongoose.connection.on('connected', function () {
//       console.log('MongoDB connection is open.');
//   });
//   console.log("Server started on port 3000");
// });