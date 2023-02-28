const express = require("express");
const router = express.Router();

const {
  addBlog,
  getAllBlogs,
  deleteBlog,
} = require("../controller/blogController");

// add blog
router.post("/add", addBlog);

// delete blog
router.post("/remove/:id", deleteBlog);

// get all blog
router.get("/", getAllBlogs);

module.exports = router;
