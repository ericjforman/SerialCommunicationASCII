// This example uses "call and response" serial communication
// It is designed to work with the Arduino example "VirtualColorMixer"
// Note that the Arduino code sends three analog sensor values from 0-1023, in theory
// - but in practice each sensor might have a limited range

// remember to import the P5 serial library into your "index.html" file

let serial;                                 // variable for the serial object
let portName = '/dev/tty.usbserial-14640'; // fill in your serial port name here

let redValue = 0;                          // for color of background
let greenValue = 0;
let blueValue = 0;


function setup() {
  createCanvas(400, 400);

  serial = new p5.SerialPort();         // make a new instance of the serialport library
  serial.on("list", printList);         // set a callback function for the serialport list event
  serial.on("connected", serverConnected); // callback for connecting to the server
  serial.on("open", portOpen);         // callback for the port opening
  serial.on("data", serialEvent);       // callback for when new data arrives
  serial.on("error", serialError);       // callback for errors
  serial.on("close", portClose);         // callback for the port closing

  serial.list(); // list the serial ports
  serial.open(portName);
}


function draw() {
  // set the background color according to sensor input:
  background(redValue, greenValue, blueValue);
}


// serialEvent method is run automatically whenever data is received
function serialEvent() {
  // read the serial buffer up to the linefeed:
  let myString = serial.readLine(); // store the data in a variable
  trim(myString);                   // get rid of whitespace
  
  if (!myString) return;            // if there's nothing in there, exit the function

  // split the string at the separator (commas), convert the segments into integers,
  // then organize into an aray:
  let colors = split(myString, ",");
  
  // print out the values you got in the console, for debugging:
  console.log(colors);
 
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


function printList(portList) {
  print("List of Serial Ports:");
  // theList is an array of their names
  for (let i = 0; i < portList.length; i++) {
    // Display in the console
    print("[" + i + "] " + portList[i]);
  }
}

function serverConnected() {
  console.log("Connected to server.");
}

function portOpen() {
  // if there's a port open, close it:
  //if (serial.serialport != null) {
  //  serial.close();
  //}
  console.log("Serial port opened.");
  serial.clear(); // clears the buffer of any outstanding data
  serial.write("A"); // send a byte to the Arduino
}

function serialError(err) {
  console.log("Serial port error: " + err);
}

function portClose() {
  console.log("Serial port closed.");
}
