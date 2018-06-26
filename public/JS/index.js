var socket = io();

socket.on('connect', function (){
    console.log('connected to server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
    let formattedTime = moment(message.createdAt).format('hh:mm');
    let template = $("#message-template").html();
    let html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    $("#messages").append(html);
});

socket.on('newLocationMessage', function(message) {
    let formattedTime = moment(message.createdAt).format('hh:mm');
    let template = $("#location-message-template").html();

    let html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createdAt: message.createdAt
    });

    $("#messages").append(html);    
});

$('#message-form').on('submit', function(e) {
    e.preventDefault();
    var messageTextBox = $('[name=message]');

    socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.val()
    }, function() {
        messageTextBox.val('');
    });
});

var locationButton = $("#send-location"); // pointer to the send location button
locationButton.on('click', function() {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.');
    }

    locationButton.attr('disabled', 'disabled').text('Sending Location..')

    navigator.geolocation.getCurrentPosition(function(position) {
        locationButton.html('Send Location');
        locationButton.removeAttr('disabled');       
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });

    }, function() {
        alert('Unable to fetch location');
        locationButton.attr('enabled', 'enabled').text('Send Location')
    });
});