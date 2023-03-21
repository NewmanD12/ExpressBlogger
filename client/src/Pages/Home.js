import BlogCard from "../Components/BlogCard"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'


const Home = (props) => {

    const { blogList } = props
    // console.log(blogList)

    return (
        <div>
            <h1>home page</h1>
            <Container>

                {blogList.map((blog, index) => {
                    return <Row className="justify-content-center m-5" key={index}>
                                <BlogCard 
                                    blog={blog}
                                />
                            </Row>
                })}

            </Container>
            
        </div>
    )
}

export default Home