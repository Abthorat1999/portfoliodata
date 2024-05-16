const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://abhaythorat:abhaythorat@cluster1.bziqj6g.mongodb.net/empform?retryWrites=true&w=majority&appName=Cluster1")
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log('failed');
})


const newSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    }
})

const collection = mongoose.model("collection",newSchema)

module.exports=collection