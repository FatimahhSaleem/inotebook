const express=require('express');
const User=require('../modules/User')
const router=express.Router();
const { query, validationResult, body } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


//jwt token 
const JWT_SECRET='dfghjertydcfvghbjrtyh'


//Create a user using :POST "/api/auth/createuser" No login required
router.post ('/createuser',[
    body('name',"Enter a valid name").isLength({min: 3}),
    body('email',"Enter a valid email").isEmail(),
    body('password',"Password should be atleast 5 charcters").isLength({ min: 5 })
],async (req, res) => {

    //If there are errors return the bad request and the error
    const errors =validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
   

//    Check if the user with this email already exists
let existingUser = await User.findOne({ email: req.body.email });
if (existingUser) {
  return res.status(400).json({ error: 'Email already exists' });
}




try {

    //bcrypt the password using hash
    const salt=await bcrypt.genSalt(10);
    const secPass=await bcrypt.hash(req.body.password,salt) ;

  // Create a new user

  let user = await User.create({
    name: req.body.name,
    email: req.body.email, 
    password: secPass
  });
  //return token to user for authentication

  const data={
    user:{
        id:user.id
    }
  }
  const authtoken=jwt.sign(data,JWT_SECRET)

  // Respond with the created user
  res.json({authtoken});

} catch (error) {
  if (error.code === 11000) {
    // Duplicate key error
    return res.status(400).json({ error: 'Email already exists' });
  }
  console.error(error);
  res.status(500).json({ error: 'Server error' });
}




});
 




module.exports= router;