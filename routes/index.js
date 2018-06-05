module.exports = function Route(app, server, counter) {
    var io = require('socket.io').listen(server)
    app.get('/', function(request, response) {
        response.render("index");
    })

    io.sockets.on('connection', function (socket) {
        socket.on("epic_button", function (data) {
            counter += 1;
            data = counter;
            console.log("My data is: " + data);
            socket.emit('update_counter', {response: data});
        });
        socket.on("reset_button", function (data) {
            counter = 0;
            data = counter;
            console.log("My data is: " + data);
            socket.emit('update_counter', {response: data});
        });
    })
};