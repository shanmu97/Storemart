const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Model/UserModel");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, phone,gender,role} = req.body;

  if (!name || !email || !password || !phone) {
    res.status(400);
    throw new Error("Enter all Fields");
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User Exists");
  }
  if (password.length < 8) {
    res.status(400);
    throw new Error("Password length must be greater than 8");
  }
  if (phone.length !== 10) {
    res.status(400);
    throw new Error("Invalid Mobile Number");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    phone,
    gender:gender,
    role:role || "Customer",
  });
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
    });
  } else {
    throw new Error("Invalid User Data");
  }
});

const loginUser=asyncHandler(async(req,res)=>{
    const {email,password} = req.body
    const user = await User.findOne({email})
    if(user && await bcrypt.compare(password,user.password)){
        res.json({
            _id:user.id,
            name:user.name,
            email:user.email,
            token:generateToken(user.id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid Credentials')
    }
})

const getUserData=asyncHandler(async(req,res)=>{
    res.json(req.user)
})
const editDetails=asyncHandler(async(req,res)=>{
    const id = req.user._id
    const user = await User.findByIdAndUpdate(id,req.body,{new:true})
    res.status(200).json(user)
})


module.exports = {registerUser,loginUser,editDetails,getUserData}