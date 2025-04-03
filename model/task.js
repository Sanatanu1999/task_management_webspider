const mongoose=require('mongoose');

const taskSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        maxlength:100
    },
    description:{
        type:String,
        default:''
    },
    status:{
        type:String,
        enum:['TODO','IN_PROGRESS','COMPLETED'],
        default:'TODO'
    },
    priority:{
        type:String,
        enum:['LOW','MEDIUM','HIGH'],
        default:'LOW'
    },
    dueDate:{
        type:Date,
        default:null
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
        }
})

const Task=mongoose.model('Task',taskSchema);

module.exports=Task;