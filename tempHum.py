#!/usr/bin/python

# Importa las librerias necesarias 
import sys
import time
import Adafruit_DHT
import RPi.GPIO as GPIO 
from RPLCD import CharLCD


# Configuracion del tipo de sensor DHT
sensor = Adafruit_DHT.DHT11
lcd = CharLCD(cols=16, rows=2, pin_rs=37, pin_e=35, pins_data=[33, 31, 29, 23])

# Configuracion del puerto GPIO al cual esta conectado  (GPIO 23)
pin = 23
i = 0
#Mostramos por pantalla mensaje de bienvenida 
lcd.clear()
lcd.write_string("Bienvenido!")
time.sleep(5)
#GPIO.cleanup()

# Intenta ejecutar las siguientes instrucciones, si falla va a la instruccion except
try:	
	# Ciclo principal infinito
	while i < 2:
		# Obtiene la humedad y la temperatura desde el sensor 
		lcd.clear()	
		print('Datos obtenidos: ')
		humedad, temperatura = Adafruit_DHT.read_retry(sensor, pin)
							
		
		# Imprime en la consola las variables temperatura y humedad con un decimal
		print('Temperatura={0:0.1f}*  Humedad={1:0.1f}%'.format(temperatura, humedad))
		
		#imprimimos por el LCD los datos obtenidos
		lcd.cursor_pos = (0,0)
		lcd.write_string("Temp:" + str(temperatura) + unichr(223) + "C" )
		lcd.cursor_pos = (1,0)
		lcd.write_string("Hum:" + str(humedad) + "%")	
		
	
		# Duerme 10 segundos
		i = i + 1
		time.sleep(5)


# Se ejecuta en caso de que falle alguna instruccion dentro del try
except Exception,e:
	# Imprime en pantalla el error e
	print str(e)

lcd.clear()
lcd.write_string("Adios =)")
time.sleep(5)
lcd.clear()
GPIO.cleanup()
