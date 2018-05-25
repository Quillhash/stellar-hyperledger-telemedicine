var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var ipfs =  require('./modules/ipf/upload');



var fileUpload = require('express-fileupload');
//var auth = require('./modules/auth/authenticate');


var bodyParser = require('body-parser');
var cors = require('cors');
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());
app.use(cors());

app.use('/ipfs',ipfs);
//app.use('/auth',auth);

  

app.get('/', (req,res)=>{
    res.send('hello world');
})
io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('offer',(offerMsg)=>{
        console.log(offerMsg)
    })
    socket.on('disconnect', function(){
        console.log('user disconnected');
      });
  });


http.listen(4800,()=>{
    console.log("listening");
})