const express = require('express');
const router = express.Router();

const validateBlogData = (blogData) => {

    if(blogData.title === undefined || typeof(blogData.title) !== 'string' || blogData.title.length > 40) {
        return {
            isValid : false,
            message : "Title is required and it must be a string less than 40 characters"
        }
    }

    if(blogData.text === undefined || typeof(blogData.text) !== 'string') {
        return {
            isValid : false, 
            message : "Text is required and it must be a string"
        }
    }

    if(blogData.author === undefined || typeof(blogData.author) !== 'string' || blogData.author.length > 40) {
        return {
            isValid : false,
            message : "Author is required and it must be a string less than 40 characters"
        }
    }

    return {
        isValid: true
    }
}

module.exports = {
    validateBlogData,
}