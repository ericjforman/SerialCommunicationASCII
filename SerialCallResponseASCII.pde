// This example code is in the public domain.

import processing.serial.*;     // import the Processing serial library
Serial myPort;                  // The serial port

float xpos, ypos;         // Starting position of the ball
float something;          // use this for something 

void setup() {
  size(640, 480);

  // List all the available serial ports
  // if using Processing 2.1 or later, use Serial.printArray()
  printArray(Serial.list());

  // I know that the first port in the serial list on my Mac is always my
  // Arduino board, so I open Serial.list()[0].
  // Change the 0 to the appropriate number of the serial port that your
  // microcontroller is attached to.
  myPort = new Serial(this, Serial.list()[3], 9600);

  // read bytes into a buffer until you get a linefeed (ASCII 10):
  myPort.bufferUntil('\n');

  // draw with smooth edges:
  smooth();
}

void draw() {
  background(0);
  fill(0,0,255);      // shape color
  
  // Draw the shape
  ellipse(xpos, ypos, 20, 20);
}

// serialEvent method is run automatically by the Processing applet whenever
// the buffer reaches the  byte value set in the bufferUntil()
// method in the setup():

void serialEvent(Serial myPort) {
  // read the serial buffer:
  String myString = myPort.readStringUntil('\n');
  
  // if you got any bytes other than the linefeed:
  myString = trim(myString);

  // split the string at the commas and convert the sections into integers:
  int sensors[] = int(split(myString, ','));

  // print out the values you got:
  for (int sensorNum = 0; sensorNum < sensors.length; sensorNum++) {
    print(sensorNum + ": " + sensors[sensorNum] + "\t\t");
  }
  // add a linefeed after all the sensor values are printed:
  println();
  
  if (sensors.length > 1) {
    xpos = map(sensors[0], 380, 610, 0, width);
    ypos = map(sensors[1], 400, 630, 0, height);
    // use this for something:
    something = sensors[2];
  }
  
  // send a byte to ask for more data:
  myPort.write("A");
}
