#include <DS3231.h>
#include <Wire.h>

DS3231 Clock;

byte Year;
byte Month;
byte Date;
byte DoW;
byte Hour;
byte Minute;
byte Second;

bool h12;
bool PM;

void GetDateStuff(byte& Year, byte& Month, byte& Day, byte& DoW, 
		byte& Hour, byte& Minute, byte& Second) {
	boolean GotString = false;
	char InChar;
	byte Temp1, Temp2;
	char InString[20];

	byte j=0;
	while (!GotString) {
		if (Serial.available()) {
			InChar = Serial.read();
			InString[j] = InChar;
			j += 1;
			if (InChar == 'x') {
				GotString = true;
			}
		}
	}
	Serial.println(InString);
	// Read Year first
	Temp1 = (byte)InString[0] -48;
	Temp2 = (byte)InString[1] -48;
	Year = Temp1*10 + Temp2;
	// now month
	Temp1 = (byte)InString[2] -48;
	Temp2 = (byte)InString[3] -48;
	Month = Temp1*10 + Temp2;
	// now date
	Temp1 = (byte)InString[4] -48;
	Temp2 = (byte)InString[5] -48;
	Day = Temp1*10 + Temp2;
	// now Day of Week
	DoW = (byte)InString[6] - 48;		
	// now Hour
	Temp1 = (byte)InString[7] -48;
	Temp2 = (byte)InString[8] -48;
	Hour = Temp1*10 + Temp2;
	// now Minute
	Temp1 = (byte)InString[9] -48;
	Temp2 = (byte)InString[10] -48;
	Minute = Temp1*10 + Temp2;
	// now Second
	Temp1 = (byte)InString[11] -48;
	Temp2 = (byte)InString[12] -48;
	Second = Temp1*10 + Temp2;
}

void setup() {
	Serial.begin(9600);
  Wire.begin();
}

void loop() {

	if (Serial.available()) {
		GetDateStuff(Year, Month, Date, DoW, Hour, Minute, Second);

		Clock.setClockMode(false);	
		Clock.setYear(Year);
		Clock.setMonth(Month);
		Clock.setDate(Date);
		Clock.setDoW(DoW);
		Clock.setHour(Hour);
		Clock.setMinute(Minute);
		Clock.setSecond(Second);
	}
  delay(1000);
	Clock.getTime(Year, Month, Date, DoW, Hour, Minute, Second);
  //Se imprime
  Serial.print(Date, DEC);
  Serial.print("/");
  Serial.print(Month, DEC);
  Serial.print("/");
  Serial.print(Year, DEC);
  Serial.print("  ");
  Serial.print(Clock.getHour(h12, PM), DEC);
  Serial.print(":");
  Serial.print(Minute, DEC);
  Serial.print(":");
  Serial.println(Second, DEC);
}