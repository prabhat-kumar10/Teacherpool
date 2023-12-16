const mongoose=require('mongoose')
const SchoolSchema=new mongoose.Schema({
    
    school_name:{
        type:String,
        required:true
    },
    job_openings:{
        type:Number,
        required:true
    },
    photo_url:{
        type:String,
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
    contact:{
        type:String,
        required:true
    },
})



const SchoolInfo=mongoose.model('SchoolInfo',SchoolSchema);

module.exports=SchoolInfo;