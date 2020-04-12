const router = require('express').Router();
const verify = require('./verifyToken')

router.get('/',verify,(req,res)=>{
    res.json({
        posts:{
            title:"MY FIRST POST",
            description:"Random DATA"
        }
    });
});

module.exports=router