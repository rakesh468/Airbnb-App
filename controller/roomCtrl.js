const Rooms=require("../models/roomModel");

class APIfeature {
    constructor(query, queryString) {
      this.query = query;
      this.queryString = queryString;
    }
    filtering() {
      const queryObj = { ...this.queryString }; //queryString=request.query//
  
      const excludedFields = ["page", "sort", "limit"];
  
      excludedFields.forEach((el) => delete queryObj[el]);
  
      let queryStr = JSON.stringify(queryObj);
  
      queryStr = queryStr.replace(
        /\b(gte|gt|lt|lte|regex)\b/g,
        (match) => "$" + match
      );
  
      this.query.find(JSON.parse(queryStr));
  
      return this;
    }
    sorting() {
      if (this.queryString.sort) {
        const sortBy = this.queryString.sort.split(",").join(" ");
        console.log(sortBy);
        this.query = this.query.sort(sortBy);
      } else {
        this.query = this.query.sort("-createdAt");
      }
      return this;
    }
    paginating() {
      const page = this.queryString.page * 1 || 1;
      const limit = this.queryString.limit * 1 || 9;
      const skip = (page - 1) * limit;
      this.query = this.query.skip(skip).limit(limit);
      return this;
    }
  }

const roomCtrl={

    getrooms:async(request,response)=>{
        try {
          
            const features = new APIfeature(Rooms.find(), request.query)
            .filtering()
            .sorting()
            .paginating();
    
          const rooms = await features.query;
    
          response.json({
            status: "success",
            result: rooms.length,
            rooms: rooms,
          });
            
        } catch (error) {
            return response.status(500).json({msg:error.message})
            
        }
    },
    createrooms:async(request,response)=>{
        try {
            const {
                room_id,
                title,
                description,
                location,
                images,
                price,
                category,
              } = request.body;
              if (!images)
                return response.status(400).json({ msg: "No images upload" });
              const room = await Rooms.findOne({ room_id });
              if (room)
                return response
                  .status(400)
                  .json({ msg: "This Room already Exists" });
        
              const newRooms = new Rooms({
                room_id,
                price,
                location,
                description,
                title,
                images,
                category
              });
              await newRooms.save();
              response.json({ msg: "Room Created Successfully" });
            
        } catch (error) {
            return response.status(500).json({msg:error.message})
            
        }
    },
    deleterooms:async(request,response)=>{
        try {
            await Rooms.findByIdAndDelete(request.params.id);
            response.json({ msg: "Deleted A Room" });
            
        } catch (error) {
            return response.status(500).json({msg:error.message})
            
        }
    },
    updaterooms:async(request,response)=>{
        try {
            const { title, price, description, location, images, category } =
            request.body;
          if (!images) return response.status(400).json({ msg: "No image found" });
          await Rooms.findOneAndUpdate(
            { _id: request.params.id },
            {
              title,
              price,
              description,
              location,
              images,
              category,
            }
          );
    
          response.json({ msg: "Room Updated successfully" });
            
        } catch (error) {
            return response.status(500).json({msg:error.message})
            
        }
    }


}



module.exports=roomCtrl;