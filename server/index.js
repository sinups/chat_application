const express = require('express');
const bodyParser = require('body-parser');
const cors=require('cors');
const Chatkit = require('pusher-chatkit-server');
require('dotenv').config();

const port = process.env.PORT || 5000;
const API_KEY=`${process.env.REACT_APP_CHATKIT_API}`;
const INST_KEY=`${process.env.REACT_APP_CHATKIT_INST}`;

const app = express();
const chatkit = new Chatkit.default({
    instanceLocator:INST_KEY,
    key:API_KEY
})
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());

app.post('/authenticate', (req, res) => {
      const authData = chatkit.authenticate({ userId: req.query.user_id })
      res.status(authData.status).send(authData.body)
    })

app.post('/users',(req,res)=>{
    const {username}=req.body;

    chatkit
        .createUser({
            name:username,
            id:username
        })
        .then(()=>res.sendStatus(201))
        .catch(error=>{
            if(error.error ==='services/chatkit/user_already_exists'){
                res.sendStatus(200);
            }else{
                res.status(error.statusCode).json(error);
            }
        });
});




app.listen(port, err=>{
    if(err){
        console.log(err)
    }else{
        console.log(`Running on ${port}`);
    }
});