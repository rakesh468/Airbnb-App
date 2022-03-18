const router=require("express").Router();
const categoryCtrl=require("../controller/categoryCtrl");
const auth=require("../middleware/auth");
const authAdmin=require("../middleware/authAdmin");



router.route("/category")
.get(categoryCtrl.getcategory)
.post(auth,authAdmin,categoryCtrl.createcategory)

router.route("/category/:id")
.put(auth,authAdmin,categoryCtrl.updatecategory)
.delete(auth,authAdmin,categoryCtrl.deletecategory)

module.exports=router;