const mongoose =require('mongoose')
const mongoUri="mongodb://localhost:27017/inotebook"
const dbName = 'your_database_name'; 

const connectToMongo=()=>{

    mongoose.connect(mongoUri)
    .then(()=>
        console.log("Connected to mongoose")
    ).catch((e)=>
        console.log(e.message))
}


module.exports=connectToMongo;