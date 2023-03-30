import BlogCard from "../Components/BlogCard"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import { useAuth } from '../Hooks/Auth'
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"


const Dashboard = (props) => {
    

    const auth = useAuth();
    const navigate = useNavigate()

    useEffect(() => {
        if(auth.userToken === null){
            navigate('/')
        }
    }, [])

    const { blogList } = props

    return (
        <div>
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

export default Dashboard