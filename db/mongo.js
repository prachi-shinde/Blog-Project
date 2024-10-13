const mongoose = require("mongoose");

//mongodb://localhost:27017
mongoose.connect("mongodb://0.0.0.0:27017/blogDatabase")
  .then(() => {
    console.log("MongoDB connected.");
    console.log("connection.readyState : ",mongoose.connection.readyState);

    const blogSchema = new mongoose.Schema({
      title: {
        type: String,
        required: true,
        trim : true
      },
      content: {
        type: String,
        required: true,
        trim : true
      }
    });

    const Blog = new mongoose.model('Blog', blogSchema);

    module.exports = {
      Blog,
      mongoose,
    };

    // Data insertion code can be placed here if needed

  })
  .catch((err) => {
    console.error("MongoDB connection error: ", err);
  });

  