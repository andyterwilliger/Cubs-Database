const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config({path: './config.env'});
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(require('./routes/players'));
//get driver connection
const dbo = require('./db/conn');
const { setInternalBufferSize } = require('bson');

app.listen(port, () =>{
    dbo.connectToServer(function(err){
        if(err) console.log(err);
    })
    console.log(`Server is running on ${PORT}`)
})