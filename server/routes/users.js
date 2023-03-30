const express = require("express");
const router = express.Router();
const { uuid } = require("uuidv4");
const {
  generatePasswordHash,
  validatePassword,
  generateUserToken,
  verifyToken,
} = require("../auth");
const { json } = require("express");

const userController = require('../controllers/usersController')


/* GET users listing. */
router.get("/all", userController.getAllUsers);
router.post("/registration", userController.createUser);
router.post("/login", userController.loginUser);

// router.get("/message", (req, res) => {
//   try {
//     const tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
//     // console.log(tokenHeaderKey)

//     const token = req.header(tokenHeaderKey);

// 		// console.log("token ", token)

// 		const verifiedTokenPayload = verifyToken(token)

//     if (!verifiedTokenPayload) {
//       return res.json({
//         success: false,
//         message: "ID Token could not be verified",
//       });
//     }

// 		// console.log(verifiedTokenPayload)
//     const userData = verifiedTokenPayload.userData;

//     if (userData && userData.scope === "user") {
//       return res.json({
//         success: true,
//         message: `I am a normal user with the email: ${userData.email}`,
//       });
//     }

// 		if (userData && userData.scope === "admin") {
//       return res.json({
//         success: true,
//         message: `I am an admin user with the email ${userData.email}`,
//       });
//     }

//     throw Error("Access Denied");
//   } catch (error) {
//     // Access Denied
//     return res.status(401).json({ success: false, message: error });
//   }
// });

module.exports = router;
