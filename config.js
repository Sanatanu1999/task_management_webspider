const env=require('dotenv').config();

const config={
    port:process.env.PORT||4000,
    mongodbUri:process.env.MONGO_URI,
};

module.exports=config