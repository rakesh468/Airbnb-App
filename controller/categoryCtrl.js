const Category=require("../models/categoryModel");
const Rooms=require("../models/roomModel")

const categoryCtrl={

    getcategory:async(request,response)=>{
        try {
            const categories = await Category.find();
            response.json(categories);
            
        } catch (error) {
            return response.status(500).json({msg:error.message})
        }
    },
    createcategory:async(request,response)=>{
        try {
             //only admin can create,edit,update the category//
          const{name}=request.body;
          const category=await Category.findOne({name})
          if(category) return response.status(400).json({msg:"This category already exists"})
          
          const newCategory=new Category({name}) 
          await newCategory.save();

          response.json({msg:"Created a Category"})
            
        } catch (error) {
            return response.status(500).json({msg:error.message})
        }
    },
    updatecategory:async(request,response)=>{
        try {
            const {name}=request.body;
            await Category.findOneAndUpdate({_id:request.params.id},{name})
            response.json({msg:"Updated a Category"})
            
        } catch (error) {
            return response.status(500).json({msg:error.message})
        }
    },
    deletecategory:async(request,response)=>{
        try {
            const rooms=await Rooms.findOne({category:request.params.id})
            if(rooms) return response.status(400).json({msg:"Please delete all the products with relationship"})
            await Category.findByIdAndDelete(request.params.id)
            response.json({msg:"Deleted a Category"})
            
        } catch (error) {
            return response.status(500).json({msg:error.message})
            
        }
    }
}

module.exports=categoryCtrl;