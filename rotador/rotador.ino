#include <Servo.h>
#include <DS3231.h>
#include <Wire.h>

char *horas[]={
    "15:24",
    "23:00",
    "22:10",
    "19:40",
    "22:20",  
    "22:25",
    "22:26"


  };
  
long nhoras = (sizeof(horas)/sizeof(char *));
bool h12;
bool PM;
DS3231 Clock;
Servo servoMotor;
int ledPIN=13;
int BOTON=7;
int val;
byte year, month, date, DoW, hour, minute, second;

void setup() {
  Wire.begin();
  Serial.begin(9600);
  pinMode(ledPIN,OUTPUT);
  pinMode(BOTON,INPUT);
}
void loop() {
    delay(1000);
    Clock.getTime(year, month, date, DoW, hour, minute, second);
    val=digitalRead(BOTON);
    if(deboGirar()==1)
      girar();

   else  if (val==HIGH)
     girar();
}


void girar(){
    servoMotor.attach(9);
    int i;
    digitalWrite(ledPIN,HIGH);
    delay(2000);
	for (i=0;i<2;i++){

    
		servoMotor.write(0);
    delay(500);
		servoMotor.write(90);
    delay(500);
    

	}
  digitalWrite(ledPIN,LOW);
    delay(2000);
	servoMotor.detach();
}

int deboGirar(){
  String h = "";
  String m = "";
  for(int i=0;i<nhoras;i++){
    h= getValue(horas[i], ':', 0);
    m= getValue(horas[i], ':', 1);
    hour = Clock.getHour(h12, PM);
    if(int(hour)==atoi(h.c_str()) && int(minute)==atoi(m.c_str()) && int(second)==0)
      return 1;
  }
  return 0;  
}
String getValue(String data, char separator, int index)
{
    int found = 0;
    int strIndex[] = { 0, -1 };
    int maxIndex = data.length() - 1;

    for (int i = 0; i <= maxIndex && found <= index; i++) {
        if (data.charAt(i) == separator || i == maxIndex) {
            found++;
            strIndex[0] = strIndex[1] + 1;
            strIndex[1] = (i == maxIndex) ? i+1 : i;
        }
    }
    return found > index ? data.substring(strIndex[0], strIndex[1]) : "";
}
