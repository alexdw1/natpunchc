var io = require('socket.io-client');
var dgram = require('dgram');


var serverUrl = 'http://localhost:3000';
var socket = io.connect(serverUrl);

//var p1 = 'hello';
//socket.emit('call', p1, function(resp, data) {
//    console.log('server sent resp code ' + resp);
//});

var host = "127.0.0.1";
var port = 12345;
var bindip = '127.0.0.1';
var bindport = '1000';
var client = dgram.createSocket( "udp4" );
client.bind(bindport, host);

console.log('Starting socket.io client...');
socket.on('connect', function () {
    console.log("socket connected");
    socket.emit('register', { name: 'alex', email: 'alexdw1@gmail.com', api: 'abc', port: '12345' });


});
socket.on('udpfire', function(msg){
    console.log('udpfire: ' + msg.port);
    //sendudp.log('')
});

setInterval(function() {
    console.log('ping');
    socket.emit('keepalive', '');
    sendudp(host, port);
}, 2000);

function sendudp(host, port) {
    var message = new Buffer( "My KungFu is Good!" );
    client.send(message, 0, message.length, port, host );
    return;
}
