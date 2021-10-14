These are re-written examples for serial communication of multiple sensors between Arduino and Processing or P5. 

Both use full range values (from 0-1023 or more), separated by commas, with each packet ended by a line return. This is not as fast as using Serial.write (limited to 0-255), but is much easier to debug. 


Method 1 - sending multiple values
- This is the recommended method, as it the easiest to debug, as you can see data either in the Arduino Serial Monitor, or Processing

	* Use Arduino example from Files / Examples / 04. Communication / VirtualColorMixer
	* Use Processing or P5 code "VirtualColorMixer"


Method 2 - sending multiple values, waiting for "call and response" (aka "handshake")
- This cannot be debugged in the Serial Monitor, you must use Processing
- But it is the most robust and error-free system

	* Use Arduino example from Files / Examples / 04. Communication / SerialCallResponseASCII
	* Use Processing or P5 code "SerialCallResponseASCII"
	* P5 code is also online: https://editor.p5js.org/ericjforman/sketches/Azc4IKkFG


P5.js versions:

1. P5 serial communication only works in Chrome! (Not Safari, Explorer, Firefox)
2. You must be running P5 Serial Control - https://github.com/p5-serial/p5.serialcontrol/releases 
3. You do NOT need to open the port, just note its name (or copy and paste from sample code on the right)
4. Remember to add the p5 serial library into you "index.html" file:
	<script language="javascript" type="text/javascript" src="https://cdn.jsdelivr.net/npm/p5.serialserver@0.0.28/lib/p5.serialport.js"></script>
