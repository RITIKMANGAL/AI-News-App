import React, { useState } from 'react';

const VoiceCommand = ({ setPage, setArticles }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    return <p>Your browser does not support the Web Speech API.</p>;
  }

  const handleStartListening = () => {
    const recognition = new SpeechRecognition(); // Correct instantiation
    recognition.lang = 'en-US'; // Set language
    recognition.continuous = false; // Stop after the user stops speaking
    recognition.interimResults = false; // Only show final results

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);

    recognition.onresult = (event) => {
      const spokenWords = event.results[0][0].transcript.toLowerCase();
      setTranscript(spokenWords);
      handleVoiceCommand(spokenWords);
    };

    recognition.start();
  };

  const handleVoiceCommand = (command) => {
    console.log('Voice Command:', command);

    if (command.includes('next')) {
      setPage((prevPage) => prevPage + 1); // Fetch next page
    } else if (command.includes('load more')) {
      setPage((prevPage) => prevPage + 1); // Alternative phrasing
    } else if (command.includes('refresh')) {
      setPage(1); // Reset to the first page
      setArticles([]); // Clear existing articles
    } else if (command.includes('stop')) {
      console.log('Voice commands stopped');
    } else {
      alert(`Unknown command: "${command}"`);
    }
  };

  return (
    <div>
      <button onClick={handleStartListening} className="voice-command-btn">
        {isListening ? 'Listening...' : 'Start Voice Command'}
      </button>
      <p>{transcript && `You said: "${transcript}"`}</p>
    </div>
  );
};

export default VoiceCommand;
