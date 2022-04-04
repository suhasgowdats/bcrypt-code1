var express = require('express');
var router = express.Router();
var {MongoClient,dburl,mongodb}=require('../dbschma');
var {hashPassword,hashCompair}=require('../auth')


router.post("/signup",async (req,res)=>{
  const clint= await MongoClient.connect(dburl);
  try{
    let db= clint.db('bcrypt');
    let user= await db.collection('users').find({ email: req.body.email }).toArray();
    console.log(user)
    if(user.length){
      res.json({
        'status':400,
        'message':"user already exist"
      })
    }else{
      let hasedpass=await hashPassword(req.body.password)
      req.body.password=hasedpass
      let user=await db.collection('users').insertOne(req.body);
      res.json({
        hasedpass
      })
    }
  }catch(err){
      console.log(err)
  }
})



router.post("/login",async (req,res)=>{
  const clint= await MongoClient.connect(dburl);
 try{
  let db= clint.db('bcrypt');
  let user= await db.collection('users').findOne({email:req.body.email});
  console.log(user)
  if(user){
    let compair= await hashCompair(req.body.password,user.password);
    if(compair){
      res.json({
        statusCode:200,
        role:user.role,
        email:user.email,
        firstname:user.firstname,
        lastname:user.lastname,
        status:"login sucessfull"
      })
    }else{
      res.json({
        statusCode:400,
        message:"Invalid password"
      })
    } 
  }else{
    req.json({
      statusCode:404,
      message:"user not found"
    })
  }
 }
 catch{
     res.json({
       message:"error"
     })
 }
})


/* GET users listing. */
router.get('/', function(req, res, next) {
 
});

module.exports = router;
