var ws = require('nodejs-websocket');
var port = '9000';

var num = 0;
// 数据存放
var sqlData = [];

var server = ws.createServer(function(socket){
  console.log('sqlData', sqlData);
  num ++;
  socket.name = 'name' + num;
  // broadcast(server, sendObj('enter', socket.name, socket.name, num));
  sendObj('enter', socket.name, socket.name, num)
  broadcast(server, JSON.stringify(sqlData));
  socket.on('text', function(data) {
    console.log('message:' + data, sqlData);
    sendObj('Chatting', data, socket.name, num)
    broadcast(server, JSON.stringify(sqlData));
  });

  socket.on('close', function(code, msg) {
    broadcast(server, sendObj('close', 'close ' + socket.name, socket.name, num));
    console.log('ws close: ', code, msg);
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
// 传输的数据
function sendObj(status, datas, name, num) {
  var obj = {
    STATUS: status,
    NUM: num,
    NAME: name,
    data: datas
  };
  sqlData.push(obj);
  // return JSON.stringify(obj);
}