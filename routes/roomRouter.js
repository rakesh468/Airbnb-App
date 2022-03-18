const router=require("express").Router()
const roomCtrl=require("../controller/roomCtrl");
const auth=require("../middleware/auth");
const authAdmin=require("../middleware/authAdmin");




router.route("/rooms")
.get(roomCtrl.getrooms)
.post(auth,authAdmin,roomCtrl.createrooms)


router.route("/rooms/:id")
.put(auth,authAdmin,roomCtrl.updaterooms)
.delete(auth,authAdmin,roomCtrl.deleterooms)


module.exports=router;