
import './App.css';
import Layout from './Layouts/Layout';
import Welcome from './Pages/Register';
import Dashboard from './Pages/Dashboard'
import SingleBlog from './Pages/SingleBlog';
import NewBlogForm from './Pages/NewBlogForm';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useAuth } from './Hooks/Auth';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Pages/Login';
import Register from './Pages/Register';

// const express = require('express');
const urlEndPoint = process.env.REACT_APP_ENDPOINT
const urlUserEndPoint = process.env.REACT_APP_USERS_ENDPOINT
// console.log(urlEndPoint)

function App() {

  const [blogList, setBlogList] = useState([])
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    axios.get(`${urlEndPoint}/all`)
          .then((res) => {
            // console.log(res)
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
      element:  <Register 
                  urlEndPoint={urlUserEndPoint}
                />,
    }, 
    {
      path : '/login',
      element:  <Login
                />,
    },
    {
      path : '/dashboard',
      element : <Layout />,
      children: [
          {
            index : true,
            element:  <Dashboard 
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
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
