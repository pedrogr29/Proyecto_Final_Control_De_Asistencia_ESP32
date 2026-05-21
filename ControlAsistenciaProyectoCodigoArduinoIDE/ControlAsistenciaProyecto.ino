// Sistema de Control de Citas para Barbería con ESP32

const int ledVerde = 18;
const int ledRojo = 19;
const int buzzer = 23;

const int botonAzul = 32;
const int botonRojo = 33;

void setup() {
  Serial.begin(115200);

  pinMode(ledVerde, OUTPUT);
  pinMode(ledRojo, OUTPUT);
  pinMode(buzzer, OUTPUT);

  pinMode(botonAzul, INPUT_PULLUP);
  pinMode(botonRojo, INPUT_PULLUP);

  digitalWrite(ledVerde, LOW);
  digitalWrite(ledRojo, LOW);
  noTone(buzzer);

  Serial.println("SISTEMA_BARBERIA_LISTO");
}

void loop() {
  if (digitalRead(botonAzul) == LOW) {
    digitalWrite(ledVerde, HIGH);
    digitalWrite(ledRojo, LOW);

    tone(buzzer, 1000);
    delay(200);
    noTone(buzzer);

    Serial.println("CLIENTE_ASISTIO");
    delay(700);
  }

  if (digitalRead(botonRojo) == LOW) {
    digitalWrite(ledRojo, HIGH);
    digitalWrite(ledVerde, LOW);

    tone(buzzer, 2000);
    delay(400);
    noTone(buzzer);

    Serial.println("CLIENTE_NO_ASISTIO");
    delay(700);
  }
}