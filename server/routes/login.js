const express =require("express")
const {handleLoginUser}=require("../controllers/login")

const router=express.Router()


router.post('/',handleLoginUser)

module.exports=router
