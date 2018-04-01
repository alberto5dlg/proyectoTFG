//Librerias
#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include "ESP8266WiFi.h"
#include "DHT.h"
#include <aREST.h>

// Define Sensor DHT11
#define DHTPIN 5
#define DHTTYPE DHT11

//Definicion puerto de escucha 
#define LISTEN_PORT 80

// Inicializacion sensor 
DHT dht(DHTPIN, DHTTYPE, 15);
 
// Constantes WiFi
const char* ssid = "RPIAlberto";
const char* password = "albertodelucas";

//Configuracion servicio WiFi y API REST
WiFiServer server(LISTEN_PORT); 
aREST apiRest = aREST();
 // Variables
int value = 0;
float temperatura; 
float humedad; 


void setup() {
      Serial.begin(115200); 
      dht.begin();
    
      //variables servicio rest
      apiRest.variable("temperatura", &temperatura); 
      apiRest.variable("humedad", &humedad); 
    
      //nombre del servicio REST 
      apiRest.set_id("1"); 
      apiRest.set_name("sensor_cocina"); 
    
      WiFi.begin(ssid, password);
      while(WiFi.status() != WL_CONNECTED) {
        delay(500); 
        Serial.println("."); 
      }
       
      Serial.println("Conectado a la red Wifi"); 
    
      server.begin(); 
      Serial.println("Servidor REST iniciado"); 

      Serial.print("Conectado a la red Wifi con la IP: "); 
      Serial.print(WiFi.localIP());
}

void loop() {
      //leemos los datos del sensor 
      temperatura = dht.readTemperature(); 
      humedad = dht.readHumidity(); 
    
      WiFiClient client = server.available(); 
      if(!client) {
        return; 
      }
      while (!client.available()) {
        Serial.println("peticion entrante");
        delay(1); 
      }
      apiRest.handle(client); 
}
