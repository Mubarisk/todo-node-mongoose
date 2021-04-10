const mongoose=require('mongoose');
const schema1=new mongoose.Schema({
    userId:{
        type:String,
        require:true
    },
    todo:{
        type:String,
        require:true
    }
  
},{collection:'todos'})


module.exports=mongoose.model('todos',schema1)