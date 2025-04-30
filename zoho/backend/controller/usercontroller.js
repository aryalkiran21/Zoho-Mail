const User = require("../models/user");

//  Get all users
const ZOHO_API_URL='https://meeting.zoho.com/api/v2/user.json';
const ZOHO_ACCESS_TOKEN = process.env.ZOHO_ACCESS_TOKEN;


exports.listUsers= async(req,res)=>{
try{
  const users= await User.find();
  res.status (200).json(users)
}
catch(error){
  res.status(500).json({error:"Error getting users details"});
}
}