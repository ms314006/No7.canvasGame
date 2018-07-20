//環境變數
var updateFPS = 30
var showMouse = true
var time = 0
var bgClolor="#001D2E"

//控制
var controls={
    value: 0
}

var gui = new dat.GUI()
gui.add(controls,"value",-2,2).step(0.01).onChange(function(value){})

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

function draw(){
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
    


    requestAnimationFrame(draw)
}

function loaded(){
    initCanvas()
    init()
    requestAnimationFrame(draw)
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
function mousedown(wvt){
    mousePos.set(evt.x,evt.y)
    mousePosDown = mousePos.clone()
}