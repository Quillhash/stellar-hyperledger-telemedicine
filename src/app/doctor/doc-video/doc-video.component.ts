import { Component, OnInit } from '@angular/core';
import * as SimplePeer from 'simple-peer'

@Component({
  selector: 'app-doc-video',
  templateUrl: './doc-video.component.html',
  styleUrls: ['./doc-video.component.css']
})
export class DocVideoComponent implements OnInit {

  title = 'app works!';
  targetPeer:any;
  peer:any;
  ngOnInit(){
    this.peer = new SimplePeer({
      initiator : location.hash == '#init',
      trickle : false
    })

    this.peer.on('signal',function(data){
      console.log(JSON.stringify(data))

    })
    this.peer.on('data',function(stream){
      
        console.log(stream);
   
      
    })
  }

  connect(){

    this.peer.signal(JSON.parse(this.targetPeer));



  }
  message(){
    let data = "Hi doctor"

    
      this.peer.send('hello');
  }
}
