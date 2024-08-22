const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const PORT = 8080;


const app = express();

mongoose.connect("mongodb+srv://bhaskarAntoty123:bhaskar3958@bhaskarantony.wagpkay.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
    console.log('MongoDB connected...');
    
})
.catch((err)=>{
    console.log(err);
    
})

app.use(cors());
app.use(express.json());
app.use('/api', require('./routes/wifi'))



// start 
app.listen(PORT, ()=>{
    console.log('backend is running port 8080');
})
