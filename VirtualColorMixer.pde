// This example is designed to work with the Arduino example "VirtualColorMixer"
// note that the Arduino code sends three analog sensor values from 0-1023 in theory
// - but in practice each sensor might have a limited range

import processing.serial.*;

float redValue = 0;                  // for color of background
float greenValue = 0;
float blueValue = 0;

Serial myPort;


void setup() {
  size(400, 400);

  // List all the available serial ports
  printArray(Serial.list());

  // Change the [#] to the appropriate number of the serial port that your
  // microcontroller is attached to!
  myPort = new Serial(this, Serial.list()[3], 9600);

  // read bytes into a buffer until you get a linefeed (ASCII 10):
  myPort.bufferUntil('\n');
}


void draw() {
  // set the background color according to sensor input:
  background(redValue, greenValue, blueValue);
}


// serialEvent method is run automatically whenever the buffer
// reaches the byte value set in the bufferUntil() method
// e.g. a linefeed such as that created by println() from the Arduino

void serialEvent(Serial myPort) {
  // read the serial buffer up to the linefeed:
  String inString = myPort.readStringUntil('\n');

  // get rid of any un-needed bytes such as spaces, tabs, carriage returns:
  if (inString != null) {
    // trim off any whitespace:
    inString = trim(inString);

    // split the string at the separator (commas), convert the segments into integers,
    // then organize into an aray:
    float[] colors = float(split(inString, ","));

    // print out the values you got in the console, for debugging:
    for (int sensorNum = 0; sensorNum < colors.length; sensorNum++) {
      print(sensorNum + ": " + colors[sensorNum] + "\t\t");
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
    
    // if the array has at least three elements, you know you got the whole packet
    if (colors.length >= 3) {
      // map them to the range 0-255 (color values are 0-255 only):
      redValue =   map(colors[0], 0, 1023,   0, 255);
      greenValue = map(colors[1], 0, 1023,   0, 255);
      blueValue =  map(colors[2], 0, 1023,   0, 255);
    }
  }
}
