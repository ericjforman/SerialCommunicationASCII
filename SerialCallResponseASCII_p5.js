// This example uses "call and response" serial communication
// It is designed to work with the Arduino example "SerialCallResponseASCII"
// note that the Arduino code sends 0 or 255 for the button (mapped from 0 or 1)

// remember to import the P5 serial library into your "index.html" file


let serial; // variable for the serial object
let portName = '/dev/tty.usbserial-14640'; // fill in your serial port name here

let numSensors = 3;             // how many data values you are sending from Arduino
//let sensors = [-1, -1, -1];     // array to hold data from arduino, -1 until connected 
let xPos = 0;                   // Starting position of the ball
let yPos = 0;
let ballColor = 0;              // color of the ball


function setup() {
  createCanvas(400, 400);

  serial = new p5.SerialPort();        // make a new instance of the serialport library
  serial.on("list", printList);       // set a callback function for the serialport list event
  serial.on("connected", serverConnected); // callback for connecting to the server
  serial.on("open", portOpen);         // callback for the port opening
  serial.on("data", serialEvent);     // callback for when new data arrives
  serial.on("error", serialError);   // callback for errors
  serial.on("close", portClose);     // callback for the port closing

  serial.list();                     // list the serial ports
  
  serial.open(portName);
  
  
  xPos = width / 2;             // start in the middle of the canvas
  yPos = height / 2;
}


function draw() {
  background(0);                      // erase screen with black
  
  // draw bigger green circle when button pressed:
  if (ballColor == 0) {
    fill(0,0,255);                    // blue
    ellipse(xPos, yPos, 50, 50);      // small circle
  } else {
    fill(0,255,0);                    // green
    ellipse(xPos, yPos, 100, 100);    // big circle
  }
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
    xPos = map(sensors[0],  380, 610,  0, width);
    yPos = map(sensors[1],  400, 630,  0, height);
    ballColor = sensors[2];          // map if necessary
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
  console.log("Serial port opened.");
  serial.clear(); // clears the buffer of any outstanding data
  serial.write("A"); // / respond back to Arduino that we are ready for new data
}

function serialError(err) {
  console.log("Serial port error: " + err);
}

function portClose() {
  console.log("Serial port closed.");
}
