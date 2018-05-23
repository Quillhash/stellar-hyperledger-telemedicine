
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import {ActivatedRoute,Params} from '@angular/router'
import * as SimplePeer from 'simple-peer'
import * as io from 'socket.io-client'

@Component({
  selector: 'app-doc-video',
  templateUrl: './doc-video.component.html',
  styleUrls: ['./doc-video.component.css']
})
export class DocVideoComponent implements OnInit ,OnDestroy{

  @ViewChild('myVideo') myVideo:any;
  title = 'app works!';
  targetPeer:any;
  peer:any;
  outputStream:any;
  disconnected:boolean=true;
  disconnectedBeforeDestroy:boolean=true;
  n= <any>navigator;
  constructor(private route:ActivatedRoute){

  }
  ngOnInit(){
    console.log(this.route.snapshot.params.id)
    const socket = io('http://localhost:4800');
    let peerx;
    let that = this;

    let video=this.myVideo.nativeElement;
    this.n.getUserMedia = (this.n.getUserMedia ||this.n.webkitGetUserMedia || this.n.mozGetUserMedia);
    this.n.getUserMedia({video:true,audio:true},function(stream){
    that.outputStream = stream;
    that.disconnected = false;
     peerx = new SimplePeer({
      initiator : that.route.snapshot.params.id == 'init',
      trickle : false,
      config: { iceServers: [ { urls: 'stun:stun.l.google.com:19302' } ] },
      stream:stream
    })
  
    peerx.on('signal',function(data){
      console.log(JSON.stringify(data))
      socket.emit('offer',data)
  
    })
    peerx.on('data',function(data){
      
        console.log(data);
   
      
    })
    peerx.on('stream',function(stream){
      video.src = URL.createObjectURL(stream);
      video.play();
    })

   },
  function(err){
    console.log(err)

  })
   
   setTimeout(()=>{
     this.peer = peerx;
   },5000) 
  }
  
  connect(){
  
    this.peer.signal(JSON.parse(this.targetPeer));
    
  
  
  }
  disconnect(){
    if(this.disconnected != true){
      this.outputStream.getTracks()[1].stop();
      this.outputStream.getTracks()[0].stop();
      this.disconnectedBeforeDestroy = false;

    }

  }
  message(){
    let data = "Hi doctor"
  
    
      this.peer.send('hello');
  }
  ngOnDestroy(){
    if(this.disconnectedBeforeDestroy == true){
    
      this.outputStream.getTracks()[1].stop();
      this.outputStream.getTracks()[0].stop();
    }
   
  }
  
}
