const express = require('express');
const router = express.Router();

var { validateBlogData } = require('../validation/blogs')

const sampleBlogs = [
    {
          title: "dicta",
      text: "Iusto et in et. Nulla accusantium fugit. Et qui dolorem inventore soluta et veritatis. Aut ut aut non laudantium eveniet suscipit odit. Sapiente sint nihil nihil sit et molestias. In nisi omnis quas et sed aut minus aperiam ea.\n \rLaudantium quo quisquam quae. Et et quas officia perspiciatis iusto sunt sunt eaque. Quidem sit voluptas deserunt sequi magni.\n \rEst est facere cumque ipsam omnis animi. Voluptatem magnam officiis architecto possimus. Quia similique aut eos qui. Quasi quae sed aliquam.",
      author: "Darren Abbott",
      category: ["Lorem", "sit", "amet"],
      createdAt: "2022-03-22T10:36:37.176Z",
      lastModified: "2022-03-22T10:36:37.176Z",
    },
    {
          title: "ducimus",
      text: "Placeat ea et fuga. Qui itaque quibusdam nam. Maxime nobis quam. Et laudantium sunt incidunt reiciendis.\n \rEarum aut sed omnis autem aliquam architecto corporis sint. Nostrum cumque voluptatem aperiam alias similique. Tenetur et esse omnis praesentium ipsum alias. Impedit rerum qui quia quaerat architecto mollitia est autem. Qui blanditiis earum et qui dolorum reprehenderit. Debitis est temporibus.\n \rEt nam sed. Corporis ut rerum. Ut qui dolore est dolorem ex.",
      author: "Luke Rogahn PhD",
      category: ["Lorem", "ipsum"],
      createdAt: "2022-03-22T15:16:56.285Z",
      lastModified: "2022-03-22T15:16:56.285Z",
    },
    {
          title: "quod",
      text: "Accusamus nisi eos. Tenetur earum tenetur nemo. Qui voluptas temporibus repellendus maxime. Ipsum optio voluptate enim nihil. Ea et dolorem. Omnis unde perspiciatis.\n \rUt odio eaque. Harum non placeat. Eveniet molestiae in cupiditate dolor doloremque rerum eligendi aut ab.\n \rMolestias eligendi et. Nemo velit natus autem numquam atque provident et nulla. In et dolores ad nihil. Delectus quis doloremque asperiores similique. Asperiores id nam vitae nobis labore autem. Dolor aperiam provident quia consectetur aut ut.",
      author: "Maryann Schneider",
      category: ["Lorem", "ipsum", "dolor", "sit", "amet"],
      createdAt: "2022-03-21T20:09:32.298Z",
      lastModified: "2022-03-21T20:09:32.298Z",
    },
    {
          title: "ut",
      text: "Itaque necessitatibus repudiandae. Porro suscipit exercitationem qui atque. Perferendis suscipit debitis sint aut dignissimos nobis ut. Modi ea nihil est vel consequuntur voluptatem. In magnam delectus in eos reiciendis sit est enim eligendi. Sint dicta at.\n \rConsectetur aspernatur alias sed non explicabo blanditiis laborum fugit voluptate. Reiciendis iste aut sit natus qui et in ratione. Placeat qui in voluptatum autem nulla ratione. Commodi sit alias sint sapiente rem. Quia sapiente minus deleniti vitae.\n \rExercitationem numquam omnis maxime dolorum sed deserunt suscipit laudantium. Ad et autem voluptatem esse laudantium et. Id fuga accusamus est sapiente dicta.",
      author: "Dr. Lorenzo Anderson",
      category: ["ipsum", "dolor", "sit", "amet"],
      createdAt: "2022-03-21T23:07:53.447Z",
      lastModified: "2022-03-21T23:07:53.447Z",
    },
    {
          title: "id",
      text: "Porro officia aliquid fugiat sed reprehenderit illo amet doloribus sed. Molestiae vero et. Quae voluptates dolores. Voluptatem facere fuga. Veniam perferendis illo ut sunt earum deleniti.\n \rIusto neque dolorem esse error. Saepe et quia ut corrupti. Autem repellendus similique dolorem sunt in ipsa perferendis. Et excepturi ut voluptatem deserunt accusantium dolores aperiam cum ut.\n \rDoloremque expedita sit et voluptatem unde libero. Numquam beatae sed repellat iusto doloribus fugit tenetur. Possimus et ut adipisci harum voluptatem provident consequatur. Corporis quo aut vel itaque blanditiis illum.",
      author: "Bobbie Dach",
      category: ["amet"],
      createdAt: "2022-03-22T15:14:39.819Z",
      lastModified: "2022-03-22T15:14:39.819Z",
    },
];

router.get('/', function(req, res, next) {
    res.send('This is the index of the blogs page');
  });

router.get('/all', function(req, res) {
  res.json({
    success : true,
    blogs : sampleBlogs
  });
});

router.get('/single/:blogTitleToGet', (req, res) => {

    const title = req.params.blogTitleToGet

    const blogFound = sampleBlogs.find((blog) =>{
        return blog.title === title
    })
    
    res.json({
        success : true, 
        blog : blogFound
    })
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
