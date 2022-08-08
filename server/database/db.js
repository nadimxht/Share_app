const mongoose=require('mongoose');
const connectDB = async () =>{
    try{

        await mongoose.connect(
            'mongodb+srv://share:share123@cluster0.66whk.mongodb.net/?retryWrites=true&w=majority',
            {
            useNewUrlParser:true,
            useUnifiedTopology:true
            }
        );
        
        console.log('connection OK');

    }catch(err){
        console.log(err)
    }
};
module.exports=connectDB;