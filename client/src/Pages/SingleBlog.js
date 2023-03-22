import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from "axios"


const SingleBlog = (props) => {
    const { id } = useParams()
    const { urlEndPoint } = props
    const [blog, setBlog] = useState({})
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [categories, setCategories] = useState([])
    const [isEditing, setIsEditing] = useState(false);
    const category_options = ['reality', 'tech', 'fintech', 'romance', 'comedy', 'food', 'travel', 'fashion', 'health', 'quia', 'corrupti', 'eaque']

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
        axios.delete(`${urlEndPoint}/delete/${id}`)
            .then((res) => {
                console.log(res)
            },
            {
            'Content-Type': 'application/json'
            })
            .catch(err => console.log(err))
            .finally(() => {
                window.location.reload(false)
            })
        
        navigate('/')
    }

    const handleCheckboxes = (e) => {
        const category = e.target.value
        console.log(categories)
        if(categories.includes(category)){
            const filteredList = categories.filter((cat) => cat !== category)
            setCategories(filteredList)
        }
        else {
            setCategories([...categories, category])
        }
    }

    const handleUpdateBlog = () => {
        const req = {
            title: title,
            text: text, 
            categories: categories
        }

        axios.put(`${urlEndPoint}/update-one/${blog._id}`, req)
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
            .finally(() => {
                window.location.reload(false)
            })

        console.log(req)
    }

    const Categories = () => {
        if(blog.categories){
            return (
                <span>{blog.categories.join(', ')}</span>
            )
        }
    }


    return (
        <Container>
            <Row className="justify-content-center">
               <Col md={6}>
                    {!isEditing && <h1>Title: {blog.title}</h1>}
                    {isEditing && (
                        <input className="m-3" 
                            type='text'
                            value={title}
                            placeholder={blog.title}
                            onChange={(e) => {
                                setTitle(e.target.value)
                            }}
                        />
                    )}
                    <br />
                    {!isEditing && <p>{blog.text}</p>}
                    {isEditing && (
                        <textarea 
                            className="m-3"
                            value={text}
                            placeholder={blog.text}
                            rows='6'
                            cols='55'
                            onChange={(e) => {
                                setText(e.target.value)
                            }}
                        />
                    )}
                    <br />
                    {!isEditing && <p><strong>Categories: </strong><Categories/></p>}
                    {isEditing && <Form.Group className="m-4 text-start">
                        <Form.Label>Categories:</Form.Label>
                        {category_options.map((category, index) => {
                            return <div key={index}>
                                        <Form.Check 
                                            type='checkbox'
                                            label={category}
                                            value={category}
                                            onChange={handleCheckboxes}
                                        />
                                    </div>
                        })}
                    </Form.Group>}
                    {!isEditing && <Button className="m-3" onClick={() => {
                                                setIsEditing(true)
                                            }}>
                                        Edit
                                    </Button>}
                    {isEditing &&   <Button className="m-3" onClick={() => {
                                                setIsEditing(false)
                                                handleUpdateBlog()}}>
                                        Update Blog
                                    </Button>}
                    {isEditing &&   <Button onClick={() => {setIsEditing(false)}}>
                                        Cancel
                                    </Button>}
                    {!isEditing && <Button className="m-3" onClick={handleDeleteBlog}>                      Delete
                                    </Button>}
               </Col> 
            </Row>
        </Container>
    )
}

export default SingleBlog