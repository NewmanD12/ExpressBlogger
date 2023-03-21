import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


const category_options = ['reality', 'tech', 'fintech', 'romance', 'comedy', 'food', 'travel', 'fashion', 'health']

const NewBlogForm = (props) => {
    
    const { urlEndPoint } = props
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [author, setAuthor] = useState('')
    const [categories, setCategories] = useState([])
    const [year, setYear] = useState('')
    const navigate = useNavigate();

    const handleCheckboxes = (e) => {
        const category = e.target.value
        if(categories.includes(category)){
            const filteredList = categories.filter((cat) => cat !== category)
            setCategories(filteredList)
        }
        else {
            setCategories([...categories, category])
        }
    }

    
    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log(categories)
        axios.post(`${urlEndPoint}/create-one`, {
            title: title,
            text: text,
            author: author,
            year: year,
            categories: categories
        })
        .then(function (response) {
            console.log(response)
          })
          .catch(function (error) {
            console.log(error);
          });
          
    }   

    return(
        <Container>
            <Row className="justify-content-center">
                <h1>Create a new blog</h1>
            </Row>
            <Row className="justify-content-center">
                <Col md={6}>
                    <Form>

                        <Form.Group className="m-4 text-start">
                            <Form.Label>Title:</Form.Label>
                            <Form.Control type='text' placeholder="Enter Title" onChange={(e) => {
                                setTitle(e.target.value)
                            }}></Form.Control>
                        </Form.Group>

                        <Form.Group className="m-4 text-start">
                            <Form.Label>Text:</Form.Label>
                            <Form.Control type='text' placeholder="Enter Text" onChange={(e) => {
                                setText(e.target.value)
                            }}></Form.Control>
                        </Form.Group>

                        <Form.Group className="m-4 text-start">
                            <Form.Label>Author:</Form.Label>
                            <Form.Control type='text' placeholder="Enter Author" onChange={(e) => {
                                setAuthor(e.target.value)
                            }}></Form.Control>
                        </Form.Group>
                        
                        <Form.Group className="m-4 text-start">
                        <Form.Label>Year:</Form.Label>
                        <Form.Control type='text' placeholder="Enter title" onChange={(e) => {
                            setYear(e.target.value)
                        }}></Form.Control>
                        </Form.Group>
                        
                        <Form.Group className="m-4 text-start">
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
                        </Form.Group>

                        <Button 
                            variant="primary" type="submit"
                            onClick={(e) => {
                                handleSubmit(e)
                                navigate('/')
                            }}
                        >
                            Submit
                        </Button>

                    </Form>
                </Col>
            </Row>
            
        </Container>
    )
}

export default NewBlogForm