var io = require('socket.io-client');
var dgram = require('dgram');

var serverUrl = 'http://151.80.177.19:3000';
var socket = io.connect(serverUrl);

var host = '151.80.177.19';
var port = 12345;
var bindport = '1000';
var client = dgram.createSocket( "udp4" );

client.bind(bindport, '0.0.0.0');

console.log('Starting socket.io client...');
socket.on('connect', function () {
    console.log("socket connected");
    socket.emit('register', { name: 'alex', email: 'alexdw1@github.com', api: 'abc', port: '12345' });
});
socket.on('udpfire', function(msg){
    console.log('udpfire: ' + msg.port);
    sendudp(host, msg.port);
});

setInterval(function() {
    socket.emit('keepalive', '');
    sendudp(host, port);
}, 2000);

function sendudp(host, port) {
    var message = new Buffer( "random" );
    client.send(message, 0, message.length, port, host );
}
