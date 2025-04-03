const express=require('express')
const Task=require('../model/task')
const Joi=require('joi')

const router=express.Router();

const taskSchema=Joi.object({
    title:Joi.string().max(100).required(),
    description:Joi.string().optional(),
    status:Joi.string().valid('TODO','IN_PROGRESS','COMPLETED').optional(),
    priority:Joi.string().valid('LOW','MEDIUM','HIGH').optional(),
    dueDate:Joi.date().optional()

})

router.post('/tasks',async(req,res)=>{
    try{
        const{error}=taskSchema.validate(req.body)
        if(error)return res.status(400).send(error.details[0].message);

        const task=new Task({...req.body,createdAt:new Date(),updatedAt:new Date()})
        await task.save()
        res.status(201).send(task)
    }catch(err){
        res.status(500).send(err.message)
    }
});

router.get('/tasks',async(req,res)=>{
    try{
        const{status,priority,sort,limit=10,skip=0}=req.query;
        const query={}
        if(status)query.status=status
        if(priority)query.priority=priority

        const tasks=await Task.find(query)
            .sort(sort==='dueDate'?{dueDate:1}:{createdAt:1})
            .limit(Number(limit))
            .skip(Number(skip))
        res.send(tasks)
    
    }catch(err){
        res.status(500).send(err.message)
    }
});

router.get('/tasks/:id',async(req,res)=>{
    try{
        const task=await Task.findById(req.params.id)
        if(!task)return res.status(404).send('Task not found')
            res.send(task)
    }catch(err){
        res.status(500).send(err.message)
    }
})

router.put('/tasks/:id',async(req,res)=>{
    try{
        const{error}=taskSchema.validate(req.body)
        if(error)return res.status(400).send(error.details[0].message);

        const task= await Task.findByIdAndUpdate(req.params.id,{...req.body,updatedAt:new Date()},{new:true});
        if(!task)return res.status(404).send('Task not found')
            res.send(task)
    }catch(err){
        res.status(500).send(err.message)
    }
})

router.delete('/tasks/:id',async(req,res)=>{
    try{
        const task=await Task.findByIdAndDelete(req.params.id);
        if(!task)return res.status(404).send('Task not found')
            res.status(204).send();
    }catch(err){
        res.status(500).send(err.message)
    }
})

module.exports=router