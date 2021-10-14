// This example uses "call and response" serial communication
// It is designed to work with the Arduino example "SerialCallResponseASCII"
// note that the Arduino code sends 0 or 255 for the button (mapped from 0 or 1)

// remember to import the P5 serial library into your "index.html" file

let serial;                                 // variable for the serial object
let portName = '/dev/tty.usbserial-14640'; // fill in your serial port name here

let numSensors = 3;                       // how many data values you are sending from Arduino
let pX, pY;                              // coordinate points of line drawing
let newX, newY;                          // next points to draw line to
let buttonPressed = 0;                  // if button is pressed or not


function setup() {
	createCanvas(400, 400);
	background(255);

  serial = new p5.SerialPort();         // make a new instance of the serialport library
  serial.on("list", printList);         // set a callback function for the serialport list event
  serial.on("connected", serverConnected); // callback for connecting to the server
  serial.on("open", portOpen);         // callback for the port opening
  serial.on("data", serialEvent);       // callback for when new data arrives
  serial.on("error", serialError);       // callback for errors
  serial.on("close", portClose);         // callback for the port closing

  serial.list(); // list the serial ports
  serial.open(portName);

  
  pX = width / 2;                         // start in the middle of the canvas
  pY = height / 2;
}


function draw() {
  // when button pressed, erase background:
  if (buttonPressed > 0) {
    background(255);
  }
  
  // fill screen with translucent white:
  noStroke();
  fill(255, 10);      // leaves a trace, WHY?
  rect(0, 0, width, height);

  // DRAW LINE
  stroke(0);          // black
  strokeWeight(3);    // 3 pixels thick
  noFill();
  line(pX, pY, newX, newY);  // draw segment from current points to new points

  pX = newX;                // update current points
  pY = newY;
}


// serialEvent method is run automatically whenever data is received
function serialEvent() {
  // read the serial buffer up to the linefeed:
  let myString = serial.readLine(); // store the data in a variable
  trim(myString);                   // get rid of whitespace
  
  if (!myString) return;            // if there's nothing in there, exit the function

  // split the string at the separator (commas), convert the segments into integers,
  // then organize into an aray:
  let sensors = split(myString, ",");
  
  // print out the values you got in the console, for debugging:
  console.log(sensors);
 
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
  serial.write("A");
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
