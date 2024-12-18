export const startListening = (onCommand) => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    console.error('Speech recognition is not supported in this browser.');
    alert('Your browser does not support speech recognition.');
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.interimResults = false; // Show only final results
  recognition.continuous = true; // Keep listening continuously

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.toLowerCase();
    onCommand(transcript);
  };

  recognition.onerror = (event) => {
    if (event.error === 'aborted') {
      console.error('Speech recognition aborted.');
      alert('Speech recognition was interrupted. Please try again.');
    } else {
      console.error('Speech recognition error:', event.error);
      alert(`An error occurred: ${event.error}`);
    }
  };

  recognition.onend = () => {
    console.log('Speech recognition ended.');
    alert('Speech recognition stopped.');
  };

  recognition.start(); // Start recognition

  // Return the stop function for clean-up
  const stopRecognition = () => {
    recognition.stop(); // Stops the recognition
    console.log('Speech recognition has been stopped.');
  };

  return stopRecognition; // Allow external stop control
};
