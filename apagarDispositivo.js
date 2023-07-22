function apagarDispositivo() {
    // Realizar una petición GET al ESP8266 para apagar el dispositivo conectado a Arduino
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://192.168.1.9/14/off", true);
    xhttp.send();
  }