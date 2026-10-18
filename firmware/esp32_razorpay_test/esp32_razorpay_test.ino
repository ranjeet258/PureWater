#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

#include "secrets.h" // WIFI_SSID, WIFI_PASSWORD, SERVER_BASE_URL, DEVICE_TOKEN

const int LED_PIN = 2; // Common on ESP32 DevKit boards; check your board if needed.
unsigned long lastPoll=0;
const unsigned long POLL_MS=2000;

void blinkLED() {
  Serial.println("Verified TEST authorization received; blinking.");
  for(int i=0;i<5;i++){digitalWrite(LED_PIN,HIGH);delay(250);digitalWrite(LED_PIN,LOW);delay(250);}
}
bool acknowledge(const String& id) {
  HTTPClient http; http.begin(String(SERVER_BASE_URL)+"/api/device/ack");
  http.addHeader("Content-Type","application/json");
  http.addHeader("Authorization",String("Bearer ")+DEVICE_TOKEN);
  StaticJsonDocument<256> doc; doc["orderId"]=id; String body; serializeJson(doc,body);
  int code=http.POST(body); http.end(); Serial.printf("ACK status: %d\n",code); return code>=200&&code<300;
}
void pollPayment() {
  if(WiFi.status()!=WL_CONNECTED){WiFi.reconnect();return;}
  HTTPClient http; http.begin(String(SERVER_BASE_URL)+"/api/device/next");
  http.setTimeout(4000); http.addHeader("Authorization",String("Bearer ")+DEVICE_TOKEN);
  int code=http.GET();
  if(code==200){
    String payload=http.getString(); http.end();
    StaticJsonDocument<512> doc; auto err=deserializeJson(doc,payload);
    if(!err && doc["authorized"]==true){
      String id=doc["orderId"]|"";
      if(id.length()){blinkLED(); if(!acknowledge(id))Serial.println("ACK failed.");}
    } else if(err) Serial.println("JSON parse error.");
  } else {if(code>0)Serial.printf("HTTP status %d\n",code);else Serial.println(http.errorToString(code));http.end();}
}
void setup(){
 pinMode(LED_PIN,OUTPUT); digitalWrite(LED_PIN,LOW); Serial.begin(115200);
 WiFi.mode(WIFI_STA); WiFi.begin(WIFI_SSID,WIFI_PASSWORD); Serial.print("Connecting");
 unsigned long start=millis(); while(WiFi.status()!=WL_CONNECTED&&millis()-start<20000){delay(500);Serial.print(".");}
 if(WiFi.status()==WL_CONNECTED){Serial.println("\nWi-Fi connected");Serial.println(WiFi.localIP());}
 else Serial.println("\nWi-Fi failed; check credentials and restart.");
}
void loop(){if(millis()-lastPoll>=POLL_MS){lastPoll=millis();pollPayment();}delay(10);}
