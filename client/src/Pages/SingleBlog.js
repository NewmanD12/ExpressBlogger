import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';
import axios from "axios"



const SingleBlog = (props) => {
    const { id } = useParams()
    const { urlEndPoint } = props
    const [blog, setBlog] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`${urlEndPoint}/get-one-by-id/${id}`)
                .then((res) => {    
                    setBlog(res.data.blog[0])
                })
                .catch((err) => {
                    console.log('error: ', err)
                })
    }, [])

    const handleDeleteBlog = () => {
        const res = axios.delete(`${urlEndPoint}/delete/${id}`)
                        .then((res) => {
                            console.log(res)
                        },
                        {
                        'Content-Type': 'application/json'
                        })
                        .catch(err => console.log(err))
        
        navigate('/')
    }

    console.log(blog)    

    return (
        <Container>
            <Row className="justify-content-center">
               <Col md={6}>
                    <h1>Title: {blog.title}</h1>
                    <p>{blog.text}</p>
                    <p><strong>Categories: </strong>{blog.categories}</p>
                    <Button className="m-3">Edit</Button>
                    <Button className="m-3" onClick={handleDeleteBlog}>Delete</Button>
               </Col> 
            </Row>
        </Container>
    )
}

export default SingleBlog