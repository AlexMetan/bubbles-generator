import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {
  ctxHeight=800;
  ctxWidth=1200;
  allObjects=[];
  constructor() { }

  ngOnInit() {
    this.main();
    this.generateObj();
    this.loop();
  }
  @ViewChild('board', { static: true })
  canvas: ElementRef<HTMLCanvasElement>; 
  ctx: CanvasRenderingContext2D;
 
  main(){
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.ctx.canvas.width = this.ctxWidth;
    this.ctx.canvas.height = this.ctxHeight;  
  }
  loop(){
    setTimeout(()=>{
      this.update();
      this.draw();
      this.loop();
    },1);
  }
  update(){
    this.checkColision();
    this.move();
  }
  draw(){    
    this.cleanCanvas();
    this.drawObjects();
  }
  cleanCanvas(){
    this.ctx.clearRect(0,0,this.ctxWidth,this.ctxHeight);
  }
  
  generateObj(){
    for(let i=0;i<100;i++){
      let x=this.getRndValue(200,600);
      let y=this.getRndValue(200,600);
      let r=this.getRndValue(4,30);
      let velX=this.getRndValue(-1,1);
      let velY=this.getRndValue(-1,1);
      let newObj= new MyObject(
        x,y,r,this.getRndColor(),velX,velY
      );
      this.allObjects.push(newObj);
    }
  }
  drawObjects(){
    for(let i=0;i<this.allObjects.length;i++){
      this.ctx.beginPath();
      this.ctx.fillStyle=this.allObjects[i].color;
      this.ctx.arc(
        this.allObjects[i].x,
        this.allObjects[i].y,
        this.allObjects[i].r,
        0,
        2*Math.PI
      );
       this.ctx.fill();
    }
  }
  move(){
    for(let i=0;i<this.allObjects.length;i++){
      this.allObjects[i].x+=this.allObjects[i].velX;
      this.allObjects[i].y+=this.allObjects[i].velY;
    }
  }
  checkColision(){
    for(let i=0;i<this.allObjects.length;i++){
      // for(let j=0;j<this.allObjects.length;j++){
      //   if(this.allObjects[i]!=this.allObjects[j]){
      //     if(this.allObjects[i].x-this.allObjects[i].r<=this.allObjects[j].x+this.allObjects[i].r&&
      //       this.allObjects[i].x+this.allObjects[i].r>=this.allObjects[j].x-this.allObjects[i].r){
      //       this.allObjects[i].velX*=-1;
      //     }
      //     if(this.allObjects[i].y-this.allObjects[i].r<=this.allObjects[j].y+this.allObjects[i].r&&
      //       this.allObjects[i].y+this.allObjects[i].r>=this.allObjects[j].y-this.allObjects[i].r){
      //       this.allObjects[i].velY*=-1;
      //     }
      //   }        
      // }
      if(this.allObjects[i].x-this.allObjects[i].r<=0||this.allObjects[i].x+this.allObjects[i].r>=this.ctxWidth){
        this.allObjects[i].velX*=-1;
      }
      if(this.allObjects[i].y-this.allObjects[i].r<=0||this.allObjects[i].y+this.allObjects[i].r>=this.ctxHeight){
        this.allObjects[i].velY*=-1;
      }
    }
  }
  getRndColor(){
    let letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  getRndValue(min,max){
    return (Math.random() * (max - min + 1) + min);
  }
  

}
export class MyObject{
  x:number;
  y:number;
  r:number;  
  color:string;
  velX:number;
  velY:number;
  constructor(x,y,r,color,velX,velY){
    this.x=x;
    this.y=y;
    this.r=r;
    this.color=color;
    this.velX=velX;
    this.velY=velY;
  }
}
