var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var ipfs =  require('./modules/ipf/upload');

var addAssets = require('./modules/participants/addAssets');
var fileUpload = require('express-fileupload');
var identity = require('./modules/auth/register')
var auth = require('./modules/auth/authenticate');
var getParticipant =  require('./modules/participants/queryParticipant')
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
app.use('/auth',auth);
app.use('/identity',identity);
app.use('/get',getParticipant);
app.use('/ipfs',ipfs);
app.use('/assets',addAssets);
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