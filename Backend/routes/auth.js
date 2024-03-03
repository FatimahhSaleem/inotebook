const express=require('express');
const User=require('../modules/User')
const router=express.Router();
const { query, validationResult, body } = require('express-validator');
const bcrypt = require('bcrypt');
const fetchuser = require('../middleware/fetchuser');
const jwt = require('jsonwebtoken');


//jwt token 
const JWT_SECRET='dfghjertydcfvghbjrtyh'


//Route 1: Create a user using :POST "/api/auth/createuser" No login required
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
  res.status(500).json({ error: 'Internal Server error' });
}
});
 


// Route 2 : Athenticate a user using :POST "/api/auth/login" No login required
router.post ('/login',[
  body('email',"Enter a valid email").isEmail(),
  body('password',"Password can't be blank").exists()
],async (req, res) => {

  //If there are errors return the bad request and the error
  const errors =validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {email,password}=req.body;
  try {
    
//    Check if the user with this email already exists
      let user = await User.findOne({ email});
      if (!user) {
        return res.status(400).json({ error: 'Login with correct credentials' });
      }

      let passwordCompare = await bcrypt.compare( password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({ error: 'Login with correct credentials' });
      }
      const data={
        user:{
            id:user.id
        }
      }
      const authtoken=jwt.sign(data, JWT_SECRET)
      // Respond with the created user
      res.json({authtoken});
  } catch (error) {
    
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server error' });
  }
})


// Route 3 : Get loggedin user details using :GET "/api/auth/getuser".Login required.

router.get ('/getuser',fetchuser ,async (req, res) => {

try {
  const userId= req.user.id;
  const user=await User.findById(userId).select("-password");
  res.send(user);
}catch (error) {
    
  console.error(error.message);
  res.status(500).json({ error: 'Internal Server error' });
}

})



module.exports= router;