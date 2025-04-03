const express = require('express');
const mongoose=require('mongoose');
const config=require('./config')
const routes=require('./routes/tasks')
const{requestLogger,errorHandler}=require('./middleware/taskMiddleware')

const app=express();

app.use(express.json())
app.use(requestLogger)
app.use('/api',routes)
app.use(errorHandler)

mongoose.connect(config.mongodbUri,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{
    app.listen(config.port,()=>{
        console.log(`server is running on http://localhost:${config.port}`)
    })
})
.catch((err)=>{
    console.log('Database connection error:',err);
    })