const express=require('express');
const User=require('../modules/User')
const router=express.Router();
const { query, validationResult, body } = require('express-validator');


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
  // Create a new user
  let user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });

  // Respond with the created user
  res.json(user);
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