// This example uses "call and response" serial communication
// It is designed to work with the Arduino example "SerialCallResponseASCII"
// note that the Arduino code sends 0 or 255 for the button (mapped from 0 or 1)


import processing.serial.*;     // import the Processing serial library
Serial myPort;                  // The serial port

int numSensors = 3;                       // how many data values you are sending from Arduino
float pX, pY;                              // coordinate points of line drawing
float newX, newY;                          // next points to draw line to
int buttonPressed = 0;                  // if button is pressed or not



void setup() {
  size(640, 480);

  // List all the available serial ports
  printArray(Serial.list());

  // Change the [#] to the appropriate number of the serial port that your
  // microcontroller is attached to!
  myPort = new Serial(this, Serial.list()[3], 9600);

  // read bytes into a buffer until you get a linefeed (ASCII 10):
  myPort.bufferUntil('\n');

  // draw with smooth edges:
  smooth();

  pX = width / 2;                         // start in the middle of the canvas
  pY = height / 2;
}


void draw() {

  // when button pressed, erase background:
  if (buttonPressed == 255) {
    background(255);
  }

  // fill screen with translucent white:
  noStroke();
  fill(255, 10);
  rect(0, 0, width, height);

  // DRAW LINE
  stroke(0);          // black
  strokeWeight(3);    // 3 pixels thick
  noFill();
  line(pX, pY, newX, newY);  // draw segment from current points to new points

  pX = newX;                // update current points
  pY = newY;
}


// serialEvent method is run automatically whenever the buffer
// reaches the byte value set in the bufferUntil() method
// e.g. a linefeed such as that created by println() from the Arduino

void serialEvent(Serial myPort) {
  // read the serial buffer up to the linefeed:
  String myString = myPort.readStringUntil('\n');

  // get rid of any un-needed bytes such as spaces, tabs, carriage returns:
  myString = trim(myString);

  // split the string at the separator (commas), convert the segments into integers,
  // then organize into an aray:
  int sensors[] = int(split(myString, ','));

  // print out the values you got in the console, for debugging:
  for (int sensorNum = 0; sensorNum < sensors.length; sensorNum++) {
    print(sensorNum + ": " + sensors[sensorNum] + "\t\t");
  }
  // add a linefeed after all the sensor values are printed:
  println();


  // **************************************************************************
  // set ball position to move across full width and height of your canvas size
  // change map values to reflect what sensors actually ouput!
  // e.g. 0 - 1023 for a potentiometer
  // e.g. 250 - 700 for a photocell
  // e.g. 350 - 650 for an accelerometer
  // e.g. 0 or 1, or 0 or 255, for a button

  if (sensors.length >= numSensors) {
    newX = map(sensors[0], 380, 610, 0, width);
    newY = map(sensors[1], 400, 630, 0, height);
    buttonPressed = sensors[2];          // map if necessary
  }
  // **************************************************************************


  // send a byte to ask for more data ("call and response"):
  myPort.write("A");
}
