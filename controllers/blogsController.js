const Blog = require('../models/Blogs');

async function getAllBlogs(req, res) {

    //query blogs 
    try {
      const allBlogs = await Blog.find({});
      res.json({blogs: allBlogs });
    }catch(e){
      console.log(e);
    }
}

async function createOneBlog(req, res, next) {
    try {
      //parse out fields from POST request
      const title  = req.body.title 
      const text = req.body.text 
      const author = req.body.author
      const categories = req.body.category
      const year =  req.body.year;
  
      //pass fields to new Blog model 
      //notice how it's way more organized and does the type checking for us
      const newBlog = new Blog({
          title,
          text,
          author,
          categories,
          year
      });
  
      //save our new entry to the database 
      const savedData =  await newBlog.save();
      
      //return the successful request to the user 
      res.json({
          success: true,
          blogs: savedData
      });
  
    } catch (e) {
      console.log(typeof e);
      console.log(e);
      res.json({
        error: e.toString(),
      });
    }
  }

async function findBlogByTitle(req, res, next) {
    const title = req.params.titleToFind
    try {
        const blog = await Blog
            .find({
                title : {
                    $eq : title
                }
            })

            res.json({
                success : true, 
                blog : blog
            })

    }
    catch(e) {
        res.json({
            error : e.toString()
        })
    }
}

async function findBlogById(req, res, next) {
    const id = req.params.idToFind
    try {
        const blog = await Blog
            .find({
                id : {
                    $eq : id
                }
            })

            res.json({
                success : true, 
                blog : blog
            })

    }
    catch(e) {
        res.json({
            error : e.toString()
        })
    }
}

async function deleteBlog(req, res, next) {
    try {
        const deletedBlog = await Blog.
            findByIdAndDelete(req.params.id)

        if(!deletedBlog) res.status(404).send('No item found')
        res.json({
            success : true,
            message : "Blog deleted successfully"
        })
    } 
    catch (e) {
        res.json({
            error : e.toString()
        })
    }

}


module.exports = {
    getAllBlogs,
    createOneBlog,
    findBlogByTitle,
    findBlogById, 
    deleteBlog
};