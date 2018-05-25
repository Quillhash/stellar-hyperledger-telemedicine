var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fileUpload = require('express-fileupload');
var auth = require('./modules/auth/authenticate');
var participant =  require('./modules/participants/addParticipant')
var bodyParser = require('body-parser');
var cors = require('cors');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());
app.use(cors());

  
app.use('/auth',auth);
app.use('/participant',participant)
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