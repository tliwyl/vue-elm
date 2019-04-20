var timer1 = setInterval(function() {
  console.log(333);
}, 1000);
timer1.unref();
var timer2 = setInterval(function() {
  console.log(444);
}, 1000);
timer2.unref();

$.app.run(a,obj);
a()
