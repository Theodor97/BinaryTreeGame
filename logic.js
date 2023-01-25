var xDelta;
var yDelta;
var binTree; 
var arrNodes = [];

function setup(){
  for(var i = 0; i < 5; i++){
    arrNodes[i] = new Node();
    arrNodes[i].startPosition();
  }
  binTree = new BinaryTree();
  createCanvas(600,600)
}

function draw(){
  background(255);
  if(arrNodes.length > 0){
    for(var node of arrNodes){
      node.show();
      node.move();
    }
  }
  binTree.traverse(binTree.root)

}
function mouseClicked(){
  for(var i = 0; i < arrNodes.length ; i++){
    if(dist(arrNodes[i].posX, arrNodes[i].posY,mouseX,mouseY)<10){
      binTree.insertNode(arrNodes[i]);
      arrNodes[i].clicked = true;
      arrNodes.splice(i,1);
    }
  }
}
function touchStarted(){
  for(var i = 0; i < arrNodes.length ; i++){
    if(dist(arrNodes[i].posX, arrNodes[i].posY,mouseX,mouseY)<10){
      binTree.insertNode(arrNodes[i]);
      arrNodes[i].clicked = true;
      arrNodes.splice(i,1);
    }
  }
}

function BinaryTree(){
  this.root = null;
}
/*BinaryTree.prototype.insertNodeRecursive = function(node,xDelta = 200, yDelta = 20, padre = this.root){
  console.log(node.data, xDelta, yDelta);
  if(padre == null){
    node.parent = node;
    node.posX = xDelta
    node.posY = yDelta
    this.root = node;
  } else {
    if(node.data < padre.data){
      xDelta -= 40;
      yDelta += 40;
      if(padre.leftNode == null){
        node.posX = xDelta;
        node.posY = yDelta;
        node.parent = padre;
        padre.leftNode = node;
      } else {
        BinaryTree.prototype.insertNodeRecursive(node, xDelta, yDelta, padre.leftNode);
      }
    } 
    if(node.data > padre.data){
      xDelta += 40;
      yDelta += 40;
      if(padre.rightNode == null){
        node.posX = xDelta;
        node.posY = yDelta;
        node.parent = padre;
        padre.rightNode = node;
      } else {
        BinaryTree.prototype.insertNodeRecursive(node, xDelta, yDelta, padre.rightNode);
      }
    } 
  }
}*/

BinaryTree.prototype.insertNode = function(node){
  xDelta = 200
  yDelta = 20
  if(this.root == null){
    node.parent = node;
    node.lastPosX = xDelta
    node.lastPosY = yDelta
    node.level = 1;
    this.root = node;
    return;
  }else{
    var parent;
    var current = this.root;
    while(true){
      parent = current
      node.parent = parent
      if(node.data == current.data){
          return;
      }
      else if(node.data < current.data){
        node.level+= 5;
        xDelta -= (60-node.level*1.5);
        yDelta += 40;
        current = current.leftNode;
        if(current == null){
          node.lastPosX = (xDelta);
          node.lastPosY = yDelta;
          parent.leftNode = node;
          return;
        }
      }else if(node.data > current.data){
        node.level+= 5;
        xDelta += (60-node.level*1.5);
        yDelta += 40;
        current = current.rightNode;
        if(current == null){
          node.lastPosX = (xDelta);
          node.lastPosY = yDelta;
          parent.rightNode = node;
          return;
        }
      }
    }
  }
}

BinaryTree.prototype.traverse = function(node){
  if(node!=null){
    if(node.clicked == true && node.arrived == false){
      node.path();
    }
    node.show()
    this.traverse(node.leftNode)
    this.traverse(node.rightNode)
  }
}

Node.prototype.show = function(){
  if(this.arrived){
    line(this.posX, this.posY, this.parent.posX, this.parent.posY);
  }
  fill(250,255,0);
  ellipse(this.posX,this.posY,20);
  fill(0);
  textSize(15);
  text(this.data,this.posX-7,this.posY+5);
}

Node.prototype.path = function(){
   if(parseInt(Math.abs(this.posX - this.lastPosX))< 2 && parseInt(Math.abs(this.posY - this.lastPosY))< 2){
    this.clicked = false;
    this.arrived = true;
  }
  if(this.posX < this.lastPosX){
    this.posX++
  }
  if(this.posX > this.lastPosX){
    this.posX--
  }
  if(this.posY < this.lastPosY){
    this.posY++;
  }
  if(this.posY > this.lastPosY){
    this.posY--;
  }
}
Node.prototype.move = function(){
  this.posX = map(noise(this.xOff),0,1,0,600);
  this.posY = map(noise(this.yOff),0,1,0,600);
  this.xOff+= 0.001;
  this.yOff+= 0.001;
}
Node.prototype.startPosition = function(){
  this.xOff = random(0,10)
  this.yOff = random(0,30)
}
function Node(){
  this.data = int(random(0,100));
  this.leftNode = null;
  this.rightNode = null;
  this.posX = int(random(0,600));
  this.posY = int(random(0,600));
  this.xOff;
  this.yOff;
  this.level = 10;
  this.clicked = false;
  this.parent;
  this.lastPosX;
  this.lastPosY;
  this.arrived = false;
}
