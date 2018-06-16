var socket = io();
socket.on('connect', function() {
	console.log("connected to server");
});
socket.on('disconnect', function() {
	console.log("disconnected from server");
});

socket.on('newMessage',function(message) {
	if(message == 'enableGreenBtn')
	console.log("enable green btn");
	greenBtn.show();
});


var redBtn = jQuery('#red-btn');
var greenBtn = jQuery('#green-btn');
var counterTag = jQuery('#counter');
var counter = localStorage.getItem("counter") || 0;
counterTag.text(counter);
greenBtn.hide();

redBtn.on('click',function(e){
	socket.emit('newMessage',"pop");
});

greenBtn.on('click',function(e){
	incCounter();
	counterTag.text(counter);
	greenBtn.hide();
});

function incCounter(val){
	// increment counter and save to localStorage
	counter++;
	localStorage.setItem("counter",counter);
}