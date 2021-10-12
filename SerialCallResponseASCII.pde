// This example uses "call and response" serial communication
// It is designed to work with the Arduino example "SerialCallResponseASCII"


import processing.serial.*;     // import the Processing serial library
Serial myPort;                  // The serial port

int numSensors = 3;             // how many data values you are sending from Arduino
float xpos, ypos;               // Starting position of the ball
float something;                // use this for something else

void setup() {
  size(640, 480);

  // List all the available serial ports
  printArray(Serial.list());

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
  ellipse(xpos, ypos, 50, 50);
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
  
  // set ball position to move across full width and height of your canvas size
  // change map values to reflect what sensors actually ouput!
  // e.g. 0 - 1023 for a potentiometer
  // e.g. 250 - 700 for a photocell 
  // e.g. 350 - 650 for an accelerometer
  // e.g. 0 or 1, or 0 or 255, for a button
  
  if (sensors.length >= numSensors) {
    xpos = map(sensors[0],  380, 610,  0, width);
    ypos = map(sensors[1],  400, 630,  0, height);
    // use this for something else (color, size, etc.):
    something = sensors[2];          // map if necessary
  }
  
  // send a byte to ask for more data ("call and response"):
  myPort.write("A");
}
