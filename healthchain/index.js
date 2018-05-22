var express = require('express');
var app = express();
var fileUpload = require('express-fileupload');
var auth = require('./modules/auth/authenticate');
var bodyParser = require('body-parser');
var cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());
app.use(cors());
app.use('/auth',auth);


app.get('/',(req,res)=>{
    res.send('hello world');
})


app.listen(4200,()=>{
    console.log("listening");
})