
import './App.css';
import Layout from './Layouts/Layout';
import Home from './Pages/Home'
import SingleBlog from './Pages/SingleBlog';
import NewBlogForm from './Pages/NewBlogForm';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

// const express = require('express');
const urlEndPoint = process.env.REACT_APP_ENDPOINT
// console.log(urlEndPoint)

function App() {

  const [blogList, setBlogList] = useState([])

  useEffect(() => {
    axios.get(`${urlEndPoint}/all`)
          .then((res) => {
            // console.log(res.data.blogs)
            setBlogList(res.data.blogs)
          })
          .catch((err) => {
            console.log('error: ', err)
          })
  }, [])

  // console.log(blogList)

  const router = createBrowserRouter([
    {
      path : '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home 
                      blogList={blogList}
                    /> 
        },
        {
          path : 'single-blog/:id',
          element : <SingleBlog 
                      urlEndPoint={urlEndPoint}
                    />
        },
        {
          path : 'create-new',
          element : <NewBlogForm 
                      urlEndPoint={urlEndPoint}
                    />
        }

      ]
    }
  ])

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
