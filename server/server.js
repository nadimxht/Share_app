const express =require('express');
const app= express();
const connectDB=require('./database/db');
const authroutes = require('./routes/auth');

app.use(express.json());

app.use('/user',authroutes);



connectDB();
const PORT =process.env.PORT || 8000;
app.listen(PORT, () =>{
    console.log('listening on PORT',PORT)
});
