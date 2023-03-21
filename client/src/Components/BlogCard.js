import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const BlogCard = (props) => {
    const { blog } = props
    // console.log(blog)

    const blog_url = `single-blog/${blog._id}`
    // console.log(blog_url)

    return (

        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>Blog Title: {blog.title}</Card.Title>
                <Button variant="primary" href={blog_url}>See Details</Button>
            </Card.Body>
        </Card>
        
    )
}

export default BlogCard