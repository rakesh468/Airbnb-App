require("dotenv").config()
const express=require('express');
const cors=require('cors');
const fileUpload=require('express-fileupload');
const cookieParser = require('cookie-parser');
const userRouter=require("./routes/userRouter");
const uploadRouter=require("./routes/upload");
const roomRouter=require("./routes/roomRouter");
const categoryRouter=require("./routes/categoryRoutes");
const path=require("path")


//db connection///
const connection = require("./db");


const app=express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(fileUpload({
    useTempFiles:true
}))






//routes//

app.use("/user",userRouter);
app.use("/api",uploadRouter);
app.use("/api",roomRouter);
app.use("/api",categoryRouter);

const PORT=process.env.PORT || 5100;

//db connection/
connection()

if(process.env.NODE_ENV === "production"){
    app.use(express.static("client/build"))
    app.get("*",(request,response)=>{
        response.sendFile(path.join(__dirname,"client","build","index.html"))
    })
}


app.listen(PORT,()=>console.log("App is running in",PORT))