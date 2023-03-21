const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

const Blog = require('../models/Blogs');

const blogsController = require("../controllers/blogsController")



router.get('/', function(req, res, next) {
    res.send('This is the index of the blogs page');
  });
router.get('/all', blogsController.getAllBlogs)
router.post('/create-one', blogsController.createOneBlog)
router.get('/get-one/:titleToFind', blogsController.findBlogByTitle)
router.get('/get-one-by-id/:idToFind', blogsController.findBlogById)
router.delete('/delete/:id', blogsController.deleteBlog)

module.exports = router;
