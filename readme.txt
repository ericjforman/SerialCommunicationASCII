These are re-written examples for serial communication of multiple sensors between Arduino and Processing or P5. 

Both use full range values (from 0-1023 or more), separated by commas, with each packet ended by a line return. This is not as fast as using Serial.write (limited to 0-255), but is much easier to debug. 


Method 1 - sending multiple values
- This is the easiest to debug, as you can see data either in the Arduino Serial Monitor, or Processing

* Use Arduino example from Files / Examples / 04. Communication / VirtualColorMixer
* Use Processing or P5 code "VirtualColorMixer"
* Also use modular code "SerialASCII" that can be adapted for any number of inputs


Method 2 - sending multiple values, waiting for "call and response" (aka "handshake")
- This cannot be debugged in the Serial Monitor, you must use Processing
- But it is the most robust and error-free system

* Use Arduino example from Files / Examples / 04. Communication / SerialCallResponseASCII
* Use Processing or P5 code "SerialCallResponseASCII"
