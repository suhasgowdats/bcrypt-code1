const bcrypt=require('bcryptjs');
var saltRound=10;
var hashPassword=async(pws)=>{
    let salt= await bcrypt.genSalt(saltRound);
    let hash= await bcrypt.hash(pws,salt)
    return hash;
}

var hashCompair=async(pws,hash)=>{
    let result=await bcrypt.compare(pws,hash)
    return result;    
}

module.exports={hashPassword,hashCompair}