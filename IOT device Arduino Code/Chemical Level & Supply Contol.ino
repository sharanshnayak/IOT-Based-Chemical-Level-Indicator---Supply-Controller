#include <WiFi.h>
#include <WiFiClient.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include <LiquidCrystal.h>
int trigger_pin =18 ;
int echo_pin   = 5;

// Replace with your network credentials
const char* ssid = "vivo 1938";
const char* password = "7879159798";

const int rs = 13, en = 12, d4 = 27, d5 = 26, d6 = 25, d7 = 33;
LiquidCrystal lcd(rs, en, d4, d5, d6, d7);

int distance_cm;
int per=-1;
int prev_distance;

void setup() {
  Serial.begin(115200);
  lcd.begin(16, 2);
 
  pinMode(trigger_pin, OUTPUT);
  pinMode(echo_pin, INPUT);
  pinMode(22, OUTPUT);
   digitalWrite(22, HIGH);
 lcd.print("Welcome in IOT World");
    for (int positionCounter = 0; positionCounter <22; positionCounter++) {
    // scroll one position left:
    lcd.scrollDisplayLeft();
    // wait a bit:
    delay(150);
  }
  WiFi.begin(ssid, password);
  Serial.println("");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
 Serial.print("Connected to ");
  Serial.println("WiFi");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());  //IP address assigned to your ESP 
  }

void loop() {
  digitalWrite(trigger_pin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigger_pin, HIGH);
  delayMicroseconds(2);
  digitalWrite(trigger_pin, LOW);
  long duration = pulseIn(echo_pin, HIGH);
  distance_cm = (duration / 2) / 29.09;
  distance_cm=20-distance_cm;
  per=(100*distance_cm)/20;
  delay(1000);


//LCD DISPLAY
if(20!=distance_cm){
lcd.begin(16, 2);
lcd.clear();  
  lcd.setCursor(0,0); 
  lcd.print("Distance: ");
  Serial.println(distance_cm);
  lcd.print(distance_cm); 
  lcd.print("cm    ");
  
  lcd.setCursor(0,1); 
  lcd.print("Percent: "); 
  Serial.println(per);
  lcd.print(per); 
  lcd.print("%    ");
}
 // POST DATA ON SERVER
  if(prev_distance!=distance_cm){
  String postData = (String)"level=" + distance_cm;
  HTTPClient http;
  http.begin("https://chemical-level-indicator.000webhostapp.com/set_Chemical_level.php");
  http.addHeader("Content-Type", "application/x-www-form-urlencoded");

  auto httpCode = http.POST(postData);
  String payload = http.getString();

  Serial.println(postData);
  Serial.println(payload);

  http.end();
  }
  prev_distance=distance_cm;

//GET MOTOR STATUS
if (WiFi.status() == WL_CONNECTED) {
  HTTPClient client;
    client.begin("https://chemical-level-indicator.000webhostapp.com/get_Supply_status.php");
    int httpCode = client.GET();
 
if (httpCode > 0) 
    {     
       String status=client.getString();
       Serial.println(status);
       Serial.println(status[11]);
        if(status[11]=='1'){
       digitalWrite(22, LOW);      //works opposite   
       lcd.begin(16, 2);
lcd.clear();  
  lcd.setCursor(0,0); 
  lcd.print("Motor is ON"); 
        }  
        else if(status[11]=='0'){
         digitalWrite(22, HIGH);    //check this work opposite  
        
lcd.begin(16, 2);
lcd.clear();  
  lcd.setCursor(0,0); 
  lcd.print("Motor is OFF");
 
 
        }
  }
}
else{
  Serial.println("Wi-fi problem");
}
if(20!=distance_cm){
lcd.begin(16, 2);
lcd.clear();  
  lcd.setCursor(0,0); 
  lcd.print("Distance: ");
  Serial.println(distance_cm);
  lcd.print(distance_cm); 
  lcd.print("cm    ");
  
  lcd.setCursor(0,1); 
  lcd.print("Percent: "); 
  Serial.println(per);
  lcd.print(per); 
  lcd.print("%    ");
}
delay(1000);
 }








