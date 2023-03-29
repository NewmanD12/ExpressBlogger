const User = require('../models/Users')

const {
    generatePasswordHash,
    validatePassword,
    generateUserToken,
    verifyToken,
  } = require("../../auth");

async function getAllUsers(req, res) {
    try {
        const allUsers = await User.find({})
        res.json({users : allUsers})
    }
    catch (e) {
        console.log(e)
    }
}

async function createUser(req, res) {
    try{
        const email = req.body.email
        const password = req.body.password
        console.log(email)

        const saltRounds = 5

        const passwordHash = await generatePasswordHash(password, saltRounds)

        const newUser = new User({
            email, 
            password : passwordHash
        })

        const savedData = await newUser.save()
        res.json({
            success : true, 
            user : savedData,
            password: passwordHash
        })


    }
    catch (e) {
        console.log(e)
    }
}

async function loginUser(req, res) {
    try {
        const email = req.body.email;
        const password = req.body.password
        const user = await User 
                            .find({
                                email : {
                                    $eq : email
                                }
                            })

        if(!user){
            res.json({
                success : false,
                message : 'Could not find user.'
            }).status(204)
        }

        
        const isPWValid = await validatePassword(password, user[0].password)

        
        if (!isPWValid) {
            res
            .json({ success: false, message: "Password was incorrect." })
            .status(204);
            return;
        } 

        const userType = email.includes("codeimmersives.com") ? "admin" : "user";

        const data = {
            date: new Date(),
            userId: user.id, 
            scope: userType,
            email: email
          };


        const token = generateUserToken(data);

        res.json({ success: true, token, email });
        return;
  
    }
    catch (e) {
        console.log(e)
    }
}

module.exports = {
    getAllUsers, 
    createUser, 
    loginUser
}