These are re-written examples for serial communication of multiple sensors between Arduino and Processing or P5. 

They send full range values (from 0-1023 or more) using Serial.print, separated by commas, with each packet ended by a line return. This is not as fast as using Serial.write (limited to 0-255), but is much easier to debug. 


Method 1 - sending multiple values
- This example changes background color in response to three analog sensors
- This is the recommended method, as it the easiest to debug - you can see data either in the Arduino Serial Monitor, or Processing

	* Use Arduino example from Files / Examples / 04. Communication / VirtualColorMixer
	* Use Processing or P5 code in this repository - "VirtualColorMixer" or "VirtualColorMixer_p5"
	* P5 code is also online: https://editor.p5js.org/ericjforman/sketches/pR_2AzA7x
	

Method 2 - sending multiple values, waiting for "call and response" (aka "handshake")
- This exaple moves a ball on screen in response to two analog values, and changing its size and color in response to a button
- This cannot be debugged in the Serial Monitor, you must use Processing
- But it is the most robust and error-free system

	* Use Arduino example from Files / Examples / 04. Communication / SerialCallResponseASCII
	* Use Processing or P5 code "SerialCallResponseASCII"
	* P5 code is also online: https://editor.p5js.org/ericjforman/sketches/Azc4IKkFG


Bonus - same concept, sending multiple values (to make a drawing) 
- This example draws line segments in response to two analog values, and clears the screen in response to a button
- This code also uses call and response, but it will work with VirtualColorMixer Arduino code as well
- The response byte ("A") will simply be ignored 
- Note the fun "tracer" effect of erasing the screen with a translucent fill

	* Use either Arduino example above
	* Use Processing or P5 code "LineDrawing"
	* P5 code is also online: https://editor.p5js.org/ericjforman/sketches/zY0MujYWa


---------------------------------------------------------------------------


P5.js versions:

1. P5 serial communication only works in Chrome! (Not Safari, Explorer, Firefox)

2. Copy the code into a new project, or rename the sketch to "sketch.js"

3. You must be running p5.SerialControl (download from https://github.com/p5-serial/p5.serialcontrol/releases)

4. Remember to add the p5 serial library into your "index.html" file:
	<script language="javascript" type="text/javascript" src="https://cdn.jsdelivr.net/npm/p5.serialserver@latest/lib/p5.serialport.js"></script>

5. You do NOT need to open the port, just note its name (or copy and paste from sample code on the right)
