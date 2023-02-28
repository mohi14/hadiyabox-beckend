const Blog = require("../models/Blog");

const addBlog = async (req, res) => {
  try {
    const newBlog = new Blog(req.body);
    await newBlog.save();
    res.status(200).send({
      message: "Blog Added Successfully!",
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({}).sort({ _id: -1 });
    res.send(blogs);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const deleteBlog = (req, res) => {
  Blog.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).send({
        message: err.message,
      });
    } else {
      res.status(200).send({
        message: "Blog Deleted Successfully!",
      });
    }
  });
};

const updateBlog = (req, res) => {
  const newBlog = req.body.blog;
  Blog.updateOne(
    { _id: req.params.id },
    {
      $set: {
        blog: newBlog,
      },
    }
  );
};

module.exports = {
  addBlog,
  getAllBlogs,
  deleteBlog,
};
