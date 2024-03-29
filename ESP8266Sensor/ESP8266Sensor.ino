//Librerias
#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include "ESP8266WiFi.h"
#include "DHT.h"

// Define Sensor DHT11
#define DHTPIN 5
#define DHTTYPE DHT11

// Inicializacion sensor 
DHT dht(DHTPIN, DHTTYPE, 15);
 
// Constantes
const char* ssid = "MassMedia_fidujj";
const char* password = "w5Fgmf5r";
const char* mqtt_server = "192.168.100.54";

 // Variables
WiFiClient espClient;
PubSubClient client(espClient);
long lastMsg = 0;
char msg[50];
int value = 0;
int temperatura; 
int humedad; 
 
void setup() {
  pinMode(BUILTIN_LED, OUTPUT);     // Initialize the BUILTIN_LED pin as an output
  Serial.begin(115200);
  setup_wifi();
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);
}
 
void setup_wifi() {
 
  delay(10);
  // We start by connecting to a WiFi network
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);
 
  WiFi.begin(ssid, password);
 
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
 
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}
 
void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
  }
  Serial.println();
 
  // Switch on the LED if an 1 was received as first character
  if ((char)payload[0] == '1') {
    digitalWrite(BUILTIN_LED, LOW);   // Turn the LED on (Note that LOW is the voltage level
    // but actually the LED is on; this is because
    // it is acive low on the ESP-01)
  } else {
    digitalWrite(BUILTIN_LED, HIGH);  // Turn the LED off by making the voltage HIGH
  }
 
}
 
void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Attempt to connect
    if (client.connect("ESP8266Client")) {
      Serial.println("connected");
      // Once connected, publish an announcement...
      client.publish("casa/despacho/temperatura", "Datos obtenidos:");
      // ... and resubscribe
      client.subscribe("casa/despacho/luz");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}

void leer_datos() {
    temperatura = dht.readTemperature();
    humedad = dht.readHumidity();
}
 
void loop() {
 
  if (!client.connected()) {
    reconnect();
  }
  client.loop();
  leer_datos(); 
  snprintf(msg, 75, "Temperatura: %ld, Humedad: %ld \n --------------- \n", temperatura, humedad); 
  Serial.println(msg); 
  client.publish("casa/despacho/temperatura",msg); 
  delay(2000); 
  //long now = millis();
  /*if (now - lastMsg > 2000) {
    lastMsg = now;
    ++value;
    snprintf (msg, 75, "hello world #%ld", value);
    Serial.print("Publish message: ");
    Serial.println(msg);
    client.publish("casa/despacho/temperatura", msg);
  }*/
}
