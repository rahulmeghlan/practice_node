/**
 * Created with JetBrains WebStorm.
 * User: rmeghl
 * Date: 2/26/14
 * Time: 12:25 PM
 * To change this template use File | Settings | File Templates.
 */
function Shape() {
    this.distance_from_origin = function () {
        return Math.sqrt(this.X * this.X + this.Y * this.Y);
    }
}

Shape.prototype.X = 0;
Shape.prototype.Y = 0;

Shape.prototype.move = function (x, y) {
    this.X = x;
    this.Y = y;
}

Shape.prototype.distance_from_origin = function () {
    return Math.sqrt(this.X * this.X + this.Y * this.Y);
}

Shape.prototype.area = function(){
//    throw new Error("need a 2d form");
}


function Square(){
}

Square.prototype = new Shape();
Square.prototype.__proto__ = Shape.prototype;
Square.prototype.Width = 0;

Square.prototype.area = function(){
    return this.Width * this.Width;
}

function Rectangle(){}

Rectangle.prototype = new Square();
Rectangle.prototype.__proto__ = Square.prototype;

Rectangle.prototype.area = function(){
    return this.Width * this.Height;
}

var rec = new Rectangle();
rec.move(-5, -5);
rec.Width = 15;
rec.Height = 2;

console.log(rec.distance_from_origin());
console.log(rec.area());



var sq = new Square();
sq.move(10, 10);
sq.Width = 15;
console.log(sq.distance_from_origin());
console.log(sq.area());