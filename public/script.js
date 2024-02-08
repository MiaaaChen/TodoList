const socket = io();

document.addEventListener('DOMContentLoaded', (event) => {
    
    socket.on('dataUpdated', (data) => {
        console.log('Received dataUpdated event:', data);
        window.location.href = '/';
    });

    socket.on('updateSuccess', (data) => {
        console.log('Received dataUpdated event:', data);
        window.location.href = '/';
    });

    socket.on('deleteSuccess', (data) => {
        console.log('Received dataUpdated event:', data);
        window.location.href = '/';
    });


});
