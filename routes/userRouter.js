const router=require("express").Router();
const userCtrl=require("../controller/userCtrl")
const auth=require("../middleware/auth");



router.post("/register",userCtrl.register)
router.post("/login",userCtrl.login)
router.get("/refresh_token",userCtrl.refreshtoken)
router.get("/logout",userCtrl.logout)
router.get("/infor",auth,userCtrl.getuser)


module.exports=router