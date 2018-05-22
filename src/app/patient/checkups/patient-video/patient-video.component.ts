import { Component, OnInit, ViewChild } from '@angular/core';
import * as SimplePeer from 'simple-peer'

@Component({
  selector: 'app-patient-video',
  templateUrl: './patient-video.component.html',
  styleUrls: ['./patient-video.component.css']
})
export class PatientVideoComponent implements OnInit {
  @ViewChild('myVideo') myVideo:any;
  title = 'app works!';
  targetPeer:any;
  peer:any;
  
  n= <any>navigator;
  ngOnInit(){
    let peerx;
    let video=this.myVideo.nativeElement;
    this.n.getUserMedia = (this.n.getUserMedia ||this.n.webkitGetUserMedia || this.n.mozGetUserMedia);
   this.n.getUserMedia({video:true,audio:true},function(stream){
     peerx = new SimplePeer({
      initiator : location.hash == '#init',
      trickle : false,
      config: { iceServers: [ { urls: 'stun:stun.l.google.com:19302' } ] },
      stream:stream
    })
  
    peerx.on('signal',function(data){
      console.log(JSON.stringify(data))
  
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
  message(){
    let data = "Hi doctor"
  
    
      this.peer.send('hello');
  }
  
}
