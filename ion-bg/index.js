class  Circle{
  constructor(ctx, x, y, w, h){
    this.ctx = ctx
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.r = Math.random()*6
    this._mx  = Math.random()
    this._my = Math.random()
  }
  drawCircle(){
    this.ctx.beginPath()
    this.ctx.arc(this.x, this.y, this.r, 0, 360)
    this.ctx.closePath()
    this.ctx.fillStyle  = '#ccc'
    this.ctx.fill()
  }
  drawLine(_circle){
    let dx = this.x - _circle.x
    let dy =this.y- _circle.y
    let d = Math.sqrt(dx*dx + dy*dy)
    if(d<150){
      this.ctx.beginPath()
      this.ctx.moveTo(this.x, this.y)
      this.ctx.lineTo(_circle.x, _circle.y)
      this.ctx.closePath()
      this.ctx.strokeStyle='rgba(204,204,204,0.3)'
      this.ctx.stroke()
    }
  }
  move(){
    this._mx = (this.x<this.w && this.x>0) ? this._mx : (-this._mx)
    this._my = (this.y<this.h && this.y>0) ? this._my : (-this._my)
    this.x += this._mx/2
    this.y += this._my/2
  }
}
let draw = function(ctx,circles,w,h){
  window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimation || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame
  ctx.clearRect(0, 0, w, h)
  for(let i = 0; i < circles.length; i++){
    circles[i].move()
    circles[i].drawCircle()
    for(let j = i+1; j < circles.length; j++){
      circles[i].drawLine(circles[j])
    }
  }
}
function initial(element,num){
  let canvas = element
  let ctx = canvas.getContext('2d')
  let w = canvas.width = canvas.offsetWidth
  let h = canvas.height = canvas.offsetHeight
  let circles = []
  window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimation || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame
  for(let i = 0; i < num; i++){
    circles.push(new Circle(ctx,Math.random()*w, Math.random()*h,w,h))
  }
  let draw = function(){
    ctx.clearRect(0, 0, w, h)
    for(let i = 0; i < circles.length; i++){
      circles[i].move()
      circles[i].drawCircle()
      for(let j = i+1; j < circles.length; j++){
        circles[i].drawLine(circles[j])
      }
    }
    requestAnimationFrame(draw)
  }
  draw()
}
