//環境變數
var updateFPS = 30
var showMouse = true
var time = 0
var bgClolor="#001D2E"
var startGame = false

//控制
/*
var controls={
    value: 0
}

var gui = new dat.GUI()
gui.add(controls,"value",-2,2).step(0.01).onChange(function(value){})
*/

//------------------------

class Vec2{
    constructor(x,y){
        this.x=x
        this.y=y
    }
    set(x,y){
        this.x=x
        this.y=y
    }
    move(x,y){
        this.x+=x
        this.y+=y
    }
    add(v){
        return new Vec2(this.x+v.x,this.y+v.y)
    }
    addIndex(nx,ny){
        return new Vec2(this.x+nx,this.y+ny)
    }
    sub(v){
        return new Vec2(this.x-v.x,this.y-v.y)
    }
    mul(s){
        return new Vec2(this.x*s,this.y*s)
    }
    get length(){
        return Math.sqrt(this.x*this.x + this.y*this.y)
    }
    set length(nv){
        let temp = this.unit.mul(nv)
        this.set(temp.x,temp.y)
    }
    clone(){
        return new Vec2(this.x,this.y)
    }
    toString(){
        return `(${this.x},${this.y})`
    }
    equal(v){
        return this.x == v.x && this.y == v.y
    }
    get angle(){
        return Math.atan2(this.y,this.x)
    }
    get unit(){
        return  this.mul(1/this.length)
    }
}

//------------------------

var canvas = document.getElementById("myCanvas")
var ctx = canvas.getContext("2d")
ctx.circle = function(v,r){
    this.arc(v.x,v.y,r,0,Math.PI*2)
}
ctx.line = function(v1,v2){
    this.moveTo(v1.x,v1.y)
    this.lineTo(v2.x,v2.y)

}

function initCanvas(){
    ww = canvas.width=window.innerWidth
    wh = canvas.height= window.innerHeight
}

initCanvas()

function init(){

}

function update(){
    time++
}

function drawMain(){
    //清空背景
    ctx.fillStyle = bgClolor
    ctx.fillRect(0,0,ww,wh)

    //中心點
    let centerIndex = new Vec2(ww/2,wh/2)

    //大圓小圓
    ctx.strokeStyle="#FFFFFF";
    ctx.beginPath()
    ctx.lineWidth=1
    ctx.circle(centerIndex,300)
    ctx.stroke()
    ctx.closePath();

    ctx.beginPath()
    ctx.lineWidth=2
    ctx.circle(centerIndex,200)
    ctx.stroke()
    ctx.closePath();

    // R
    ctx.beginPath();
    ctx.font = "100px Arial";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText("R",centerIndex.x-15, centerIndex.y-10);
    ctx.closePath();

    //電池
    ctx.beginPath();
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(centerIndex.x-48, centerIndex.y-69,15,5)
    ctx.closePath();

    ctx.beginPath();
    ctx.fillStyle = "#F5AF5F";
    ctx.fillRect(centerIndex.x-55, centerIndex.y-65,30,47)
    ctx.closePath();

    ctx.beginPath();
    ctx.fillStyle = "#F5AF5F";
    ctx.fillRect(centerIndex.x-55, centerIndex.y-15,30,5)
    ctx.closePath();

    //閃電
    ctx.beginPath();
    ctx.fillStyle = "#FFFFFF";
    ctx.moveTo(centerIndex.x-35, centerIndex.y-55)
    ctx.lineTo(centerIndex.x-45, centerIndex.y-40)
    ctx.lineTo(centerIndex.x-40, centerIndex.y-40)
    ctx.closePath();
    
    ctx.moveTo(centerIndex.x-45, centerIndex.y-25)
    ctx.lineTo(centerIndex.x-35, centerIndex.y-40)
    ctx.lineTo(centerIndex.x-40, centerIndex.y-40)
    ctx.closePath();
    ctx.fill()

    //gameName
    ctx.beginPath();
    ctx.font = "24px Arial";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText("Radio Defense",centerIndex.x-78, centerIndex.y+20);
    ctx.closePath();

    //gameStart
    ctx.beginPath();
    ctx.font = "24px Arial";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText("Start Game",centerIndex.x-60, centerIndex.y+70);
    ctx.closePath();

    //gameStart的框框
    ctx.beginPath();
    ctx.fillStyle = "#FFFFFF";
    ctx.moveTo(centerIndex.x-70, centerIndex.y+85)
    ctx.arc(centerIndex.x-70, centerIndex.y+62.5,22,Math.PI*0.5,Math.PI*1.5)
    ctx.lineTo(centerIndex.x-70, centerIndex.y+40)
    ctx.lineTo(centerIndex.x+70, centerIndex.y+40)
    ctx.arc(centerIndex.x+70, centerIndex.y+62.5,22,Math.PI*1.5,Math.PI*0.5)
    ctx.lineTo(centerIndex.x+70, centerIndex.y+85)
    ctx.closePath();
    ctx.stroke();

    //遊戲說明
    ctx.beginPath();
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText("你身負著運送能量電池的任務",100, wh-120);
    ctx.fillText("卻遭到幾何星人的埋伏",100, wh-80);
    ctx.fillText("請協助從他們手中奪回能量電池",100, wh-40);
    ctx.closePath();
    
    //畫個圓形
    ctx.beginPath()
    ctx.fillStyle = "#F5AF5F";
    ctx.arc(ww*0.85,wh*0.2,50,0,Math.PI*2)
    ctx.fill()
    ctx.closePath();

    //畫個三角形
    ctx.beginPath()
    ctx.fillStyle = "#3676BB";
    ctx.moveTo(ww*0.65, wh*0.9)
    ctx.lineTo(ww*0.71, wh*0.75)
    ctx.lineTo(ww*0.78, wh*0.9)
    ctx.closePath();
    ctx.fill()

    //畫個多邊形
    ctx.beginPath()
    ctx.fillStyle = "#E7465D";
    ctx.moveTo(ww*0.1, wh*0.2)
    ctx.lineTo(ww*0.15, wh*0.15)
    ctx.lineTo(ww*0.22, wh*0.18)
    ctx.lineTo(ww*0.23, wh*0.25)
    ctx.lineTo(ww*0.2, wh*0.32)
    ctx.lineTo(ww*0.13, wh*0.28)
    ctx.closePath();
    ctx.fill()

    if(!startGame){
        requestAnimationFrame(drawMain)
    }
}

function drawPlay(){
    //清空背景
    ctx.fillStyle = bgClolor
    ctx.fillRect(0,0,ww,wh)

    //底線的格子
    ctx.strokeStyle="#3676BB";
    ctx.lineWidth=0.1
    for(var i=0;i<window.innerWidth;i++){
        i+=100
        ctx.moveTo(i,0)
        ctx.lineTo(i,window.innerWidth)
    }
    for(var i=0;i<window.innerHeight;i++){
        i+=100
        ctx.moveTo(0,i)
        ctx.lineTo(window.innerWidth,i)
    }
    ctx.stroke()


    //中心點
    var center = new Vec2(ww/2,wh/2)

    //-----玩家機體-----
    //圓形外面的虛線
    ctx.setLineDash([5,4])
    ctx.strokeStyle="#FFFFFF";
    ctx.beginPath()
    ctx.lineWidth=2
    ctx.circle(center,70)
    ctx.stroke()
    ctx.save()
    ctx.setLineDash([40,0])

    //圓形區塊
    ctx.lineWidth=7
    ctx.beginPath()
    ctx.circle(center,40)
    ctx.stroke()
    ctx.save()

    //中間線條
    //連到的三個點
    ctx.lineWidth=3
    ctx.beginPath()
    var circlePath=center.addIndex(0,-40)
    ctx.line(center,circlePath)
    var circlePath=center.addIndex(-32,21)
    ctx.line(center,circlePath)
    var circlePath=center.addIndex(37,22)
    ctx.line(center,circlePath)
    ctx.stroke()
    ctx.save()

    //槍口
    


    requestAnimationFrame(drawPlay)
}


function loaded(){
    initCanvas()
    init()
    requestAnimationFrame(drawMain)
    setInterval(update,1000/updateFPS)
}

window.addEventListener("load",loaded)
window.addEventListener("resize",initCanvas)

var mousePos = new Vec2(0,0)
var mousePosDown = new Vec2(0,0)
var mousePosUp = new Vec2(0,0)
window.addEventListener("mousemove",mousemove)
window.addEventListener("mouseup",mouseup)
window.addEventListener("mousedown",mousedown)

function mousemove(evt){
    mousePos.set(evt.x,evt.y)
    console.log(mousePos)
}
function mouseup(evt){
    mousePos.set(evt.x,evt.y)
    mousePosUp = mousePos.clone()

}
function mousedown(evt){
    mousePos.set(evt.x,evt.y)
    mousePosDown = mousePos.clone()
    if(evt.x <= ww/2+92 && evt.x>=ww/2-92 && evt.y <=wh/2+85 && evt.y>=wh/2+40){
        startGame = true
        drawPlay()
    }
}