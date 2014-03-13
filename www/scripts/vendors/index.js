var app = {
    initialize: function() {
        this.bindEvents();
    },

    bindEvents: function() {
            document.addEventListener("deviceready", this.onDeviceReady, false);
    },

    onDeviceReady: function() {
        angular.bootstrap(document, ["musicApp"]);
        checkConnection();
    },
}
app.initialize();

function checkConnection() {
    alert('Reporting connection information');
    try{
        alert(navigator.connection.type);
    } catch(error) {
        alert('Error' + error);
        alert(navigator);
    }
}