import React from 'react';

class WordPlayer extends React.Component {
  getVoice = () => {
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(
      (voice) => voice.lang === 'en-US' && voice.name.includes('Female')
    );
    return preferredVoice || voices[0];
  };

  handleClick = () => {
    const word = this.props.word;

    // Wait for voices to load if necessary
    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.onvoiceschanged = () => {
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = 'en-US';
        utterance.voice = this.getVoice();
        window.speechSynthesis.speak(utterance);
      };
    } else {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'en-US';
      utterance.voice = this.getVoice();
      window.speechSynthesis.speak(utterance);
    }
  };

  render() {
    return (
      <div style={{ margin: '2px', textAlign: 'left' }}>
        <button onClick={this.handleClick} style={{ fontSize: '16px' }}>
          🔊
        </button>
      </div>
    );
  }
}

export default WordPlayer;