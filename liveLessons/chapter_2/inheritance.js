/**
 * Created with JetBrains WebStorm.
 * User: rmeghl
 * Date: 2/26/14
 * Time: 1:52 PM
 * To change this template use File | Settings | File Templates.
 */
function a(){

}

a.prototype.area = function(){
    console.log("from A");
}

function b(){

}

b.prototype.__proto__ = a.prototype;

b.prototype.area = function(){
    /*var temp = new a();
     temp.area();*/
//    console.log(this.__proto__.area());
    console.log(b.prototype.__proto__.area());
    console.log("from B");
}

var c = new b();

console.log(c.area());