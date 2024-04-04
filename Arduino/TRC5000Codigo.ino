int pinoSensor = 7;

void setup() {
  pinMode(pinoSensor, INPUT);
  Serial.begin(9600);
}

void loop() {
  if(digitalRead(pinoSensor) == LOW){
  Serial.println("Prateleira ocupada");
  }
  else {
  Serial.println("Prateleira vazia");
  }
  delay(2000);
}
