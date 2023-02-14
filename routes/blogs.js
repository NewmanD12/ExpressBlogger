const express = require('express');
const router = express.Router();

var { validateBlogData } = require('../validation/blogs')
const { db } = require('../mongo')

router.get('/', function(req, res, next) {
    res.send('This is the index of the blogs page');
  });

router.get('/all', async function(req, res) {
  const blogs = await db()
  .collection('sample_blogs')
  .find({})
  .toArray(function(err, result){
      if (err) {
        res.status(400).send("error fetching blogs")
      } else {
        res.json(result);
      }
    }); 

    res.json({
      success:true,
      blogs: blogs
    });
});

router.get('/get-one/:titleToFind', async (req, res) => {
  const titleToFind = req.params.titleToFind

  const blog = await db()
  .collection('sample_blogs')
  .find({
    title : {
      $eq : titleToFind
    }
  })
  .toArray(function(err, result){
    if (err) {
      res.status(400).send("error fetching blog")
    } else {
      res.json(result);
    }
  }); 

  res.json({
    success : true,
    blog : blog
  })
})

router.get('/get-one-by-id/:idToFind', async (req, res) => {
  const idToFind = req.params.idToFind

  const blog = await db()
  .collection('sample_blogs')
  .find({
    id : {
      $eq : idToFind
    }
  })
  .toArray(function(err, result){
    if (err) {
      res.status(400).send("error fetching blog")
    } else {
      res.json(result);
    }
  }); 

  res.json({
    success : true,
    blog : blog
  })
})

router.post('/create-one', async (req, res) => {
  const blog = req.body
  const entry = await db()
    .collection('sample_blogs')
    .insertOne(blog)


  res.json({
    success : true, 
    newEntry : entry
  })
})
























router.get('/single/:blogTitleToGet', async (req, res) => {
  const titleToFind = req.params.blogTitleToGet;
  const dbConnect = db.getDb();
  const blogQuery = { title : titleToFind};
  const foundBlog = dbConnect
                      .collection('sample_blogs')
                      .find(blogQuery, (err, _result) => {
                        if(err) {
                          res
                            .status(400)
                            .send(`Error finding blog ${blogQuery.title}`)
                        } else {
                          res.status(200).send('1 document found')
                        }
                      })

  res.json({
    success:true,
    foundBlog : foundBlog
  });
})


























router.delete('/delete/:blogTitleToDelete', (req, res) => {
    const title = req.params.blogTitleToDelete

    const indexOfBlog = sampleBlogs.findIndex((blog) => {
        return blog.title === title
    })

    sampleBlogs.splice(indexOfBlog, 1)

    res.json({
        success : true
    })
})

router.post('/create-one', (req, res) => {

  const reqBody = req.body

  try {
    const title = req.body.title
    const text = req.body.text
    const author = req.body.author
    const category = req.body.category

    const blogData = {
      title,
      text,
      author,
      category,
      createdAt : new Date(),
      lastModified : new Date(),
    }

    const blogDataCheck = validateBlogData(blogData)

    console.log(blogDataCheck)

    if(blogDataCheck.isValid === false) {
      throw Error(blogDataCheck.message)
    }

    sampleBlogs.push(blogData)

  } catch (e) {
    console.log(e);
    res.json({
      success : false,
      error : String(e)
    })
  }

  res.json({
    success : true
  })
})

router.put('/update-one/:blogTitle', (req, res) => {

  const blogTitle = req.params.blogTitle

  const foundBlog = sampleBlogs.find((blog) => {
    return blog.title === blogTitle
  })

  try {
    const title = req.body.title
    const text = req.body.text
    const author = req.body.author
    const category = req.body.category

    const blogData = {
      title, 
      text,
      author, 
      category
    }

    const blogDataCheck = validateBlogData(blogData)

    if(blogDataCheck.isValid === false) {
      throw Error(blogDataCheck.message)
    }

    foundBlog.title = blogData.title
    foundBlog.text = text
    foundBlog.author = author
    foundBlog.category = category
    foundBlog.lastModified = new Date()

  } catch (e) {
    // console.log(e);
    res.json({
      success : false,
      error : String(e)
    })
  }

  res.json({
    success : true
  })
})




module.exports = router;
