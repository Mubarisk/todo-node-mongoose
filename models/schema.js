const mongoose=require('mongoose');
const schema=new mongoose.Schema({
    fullname:{
        type:String,
        require:true
    },
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    // todo:{
    //     type:String,
        
    // },
    Date:{
        type:Date,
        default:Date.now
    }
},{collection:'myfirstdatabases'});
module.exports=mongoose.model('myFirstDatabase',schema)