const router = require ("express").Router();
const User = require("../models/User");
const bcrypt = require('bcrypt');

//Register
router.post('/register',async(req,res) => {
    try{

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        const newUser= new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
        })

        const user= await newUser.save();

        const {password, ...others} = user._doc ;
        res.status(200).json(others);
    }catch(err){
        res.status(500).json(err);
    }
});

//Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Check if the user with the given username exists
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
  
      // Compare the provided password with the stored hashed password
      const validPassword = await bcrypt.compare(password, user.password);
  
      if (!validPassword) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
  
      // If username and password are correct, create a session or token, and return a success response
      // Add your session or token creation logic here
  
      res.status(200).json({ message: 'Login successful' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = router;