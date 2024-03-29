import BlogCard from "../Components/BlogCard"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import { useAuth } from '../Hooks/Auth'
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"


const Dashboard = (props) => {
    

    
    const navigate = useNavigate()
    const { blogList} = props
    const auth = useAuth()
    console.log(auth)

    

    // console.log(auth)
    // console.log(props)

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