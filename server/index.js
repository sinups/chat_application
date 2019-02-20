const express = require('express');
const bodyParser = require('body-parser');
const cors=require('cors');
const Chatkit = require('pusher-chatkit-server');

const API_KEY=`${process.env.REACT_APP_CHATKIT_API_KEY}`;
const INST_KEY=process.env.REACT_APP_CHATKIT_INSTANCE;

const app = express();
/*const chatkit = new Chatkit.default({
    instanceLocator:INST_KEY,
    key:API_KEY
})*/
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 5000;

app.listen(port, err=>{
    if(err){
        console.log(err)
    }else{
        console.log(`Running on ${port},api key : ${API_KEY}`);
    }
});