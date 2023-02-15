const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

const Blog = require('../models/Blogs');

const blogsController = require("../controllers/blogsController")

router.get('/all', blogsController.getAllBlogs)
router.post('/create-one', blogsController.createOneBlog)
router.get('/get-one/:titleToFind', blogsController.findBlogByTitle)
router.get('/get-one-by-id/:idToFind', blogsController.findBlogById)
router.delete('/delete/:id', blogsController.deleteBlog)

// var { validateBlogData } = require('../validation/blogs')
// const { db } = require('../mongo')

// router.get('/', function(req, res, next) {
//     res.send('This is the index of the blogs page');
//   });

// router.delete('/delete/:blogTitleToDelete', (req, res) => {
//     const title = req.params.blogTitleToDelete

//     const indexOfBlog = sampleBlogs.findIndex((blog) => {
//         return blog.title === title
//     })

//     sampleBlogs.splice(indexOfBlog, 1)

//     res.json({
//         success : true
//     })
// })


// router.put('/update-one/:blogTitle', (req, res) => {

//   const blogTitle = req.params.blogTitle

//   const foundBlog = sampleBlogs.find((blog) => {
//     return blog.title === blogTitle
//   })

//   try {
//     const title = req.body.title
//     const text = req.body.text
//     const author = req.body.author
//     const category = req.body.category

//     const blogData = {
//       title, 
//       text,
//       author, 
//       category
//     }

//     const blogDataCheck = validateBlogData(blogData)

//     if(blogDataCheck.isValid === false) {
//       throw Error(blogDataCheck.message)
//     }

//     foundBlog.title = blogData.title
//     foundBlog.text = text
//     foundBlog.author = author
//     foundBlog.category = category
//     foundBlog.lastModified = new Date()

//   } catch (e) {
//     // console.log(e);
//     res.json({
//       success : false,
//       error : String(e)
//     })
//   }

//   res.json({
//     success : true
//   })
// })




module.exports = router;
