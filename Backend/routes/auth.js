const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

router.post('/', [
    body('username',"Username must be more than 3 letters").isLength({min:3}),
    body('email', "Invalid Email").isEmail,
    body('password',"Password must be 6 or more charachters").isLength({min:6})
],

(req,res)=>{
    const err = validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json({ errors: err.array() });
}
User.create({
  username: req.body.username,
  email: req.body.email,
  password: req.body.password,
}).then(user => res.json(user)).catch(err =>{ console.log(err)
 res.json({error: "Email already in use"})});

})

module.exports = router;