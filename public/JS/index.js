var socket = io();

socket.on('connect', function (){
    console.log('connected to server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
    let formattedTime = moment(message.createdAt).format('hh:mm');
    var li = jQuery('<li></li>');
    li.text(`${message.from} ${formattedTime}: ${message.text}`);
    $("#messages").append(li);
});

socket.on('newLocationMessage', function(message) {
    let formattedTime = moment(message.createdAt).format('hh:mm');
    
    let li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My Current Location</a>');

    li.text(`${message.from}: ${formattedTime}`);
    a.attr('href', message.url);
    li.append(a);
    $("#messages").append(li);    
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