var ws = require('nodejs-websocket');
var port = '9000';

var num = 0;

var server = ws.createServer(function(socket){
  num ++;
  socket.name = 'name' + num;
  broadcast(server, 'Welcome name' + num);
  socket.on('text', function(data) {
    console.log('message:' + data);
    broadcast(server, data);
  });
  socket.on('close', function(code, msg) {
    console.log('ws close', code, msg);
  });
  socket.on('error', function(error) {
    console.log('ws error', error);
  });
}).listen(port, function() {
  console.log('Success！port at ' + port);
});

// 遍历所有socket
function broadcast(server, msg) {
  server.connections.forEach(function (conn) {
      conn.sendText(msg)
  })
}

function sendObj = {
  
};