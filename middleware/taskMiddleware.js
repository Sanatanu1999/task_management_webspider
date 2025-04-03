const morgan=require('morgan')

const requestLogger=morgan('combined')

const errorHandler=(err,req,res,next)=>{
    console.error(err.stack);
    res.status(500).send('Something broke!');
}

module.exports={requestLogger,errorHandler}