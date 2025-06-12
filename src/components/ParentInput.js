import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ParentInput = () => {
  const [pairs, setPairs] = useState([]);
  const [word, setWord] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const savedPairs = localStorage.getItem('wordImagePairs');
    if (savedPairs) {
      setPairs(JSON.parse(savedPairs));
    }
  }, []);

  const validateUrl = (url) => {
    const pattern = /^https?:\/\/.*\.(png|jpg|jpeg|gif)$/i;
    return pattern.test(url);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!word.trim() || !imageUrl.trim()) {
      setError('Both fields are required!');
      return;
    }

    if (!validateUrl(imageUrl)) {
      setError('Please enter a valid image URL');
      return;
    }

    const newPairs = [...pairs, { word: word.trim(), imageUrl, isCorrectMatch: false }];
    setPairs(newPairs);
    localStorage.setItem('wordImagePairs', JSON.stringify(newPairs));
    setWord('');
    setImageUrl('');
    setError('');
  };

  const handleRemove = (index) => {
    const updatedPairs = pairs.filter((_, i) => i !== index);
    setPairs(updatedPairs);
    localStorage.setItem('wordImagePairs', JSON.stringify(updatedPairs));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-kitty-pink to-kitty-blue p-8">
      <div className="max-w-md mx-auto bg-white rounded-3xl shadow-xl p-8">
        <h1 className="text-4xl font-fredoka text-kitty-pink text-center mb-8 animate-float">
          Hello Kitty English!
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-fredoka text-gray-700 mb-2">Word</label>
            <input               type="text"
              value={word}
              onChange={(e) => setWord(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border-2 border-kitty-pink focus:outline-none focus:border-kitty-blue"
              placeholder="Enter a word..."
            />
          </div>

          <div>
            <label className="block font-fredoka text-gray-700 mb-2">Image URL</label>
            <input               type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border-2 border-kitty-pink focus:outline-none focus:border-kitty-blue"
              placeholder="https://example.com/image.png"
            />
          </div>

          {error && (
            <p className="text-red-500 text-center font-fredoka">{error}</p>
          )}

          <button             type="submit"
            className="w-full bg-kitty-pink hover:bg-kitty-blue transition-colors duration-300 text-white font-fredoka py-3 rounded-xl animate-bounce-slow"
          >
            Add Word-Image Pair
          </button>
        </form>

        <div className="mt-8">
          <h2 className="font-fredoka text-2xl text-kitty-pink mb-4">Current Pairs:</h2>
          <div className="space-y-4">
            {pairs.map((pair, index) => (
              <div key={index} className="flex items-center bg-kitty-yellow/20 p-4 rounded-xl relative">
                <span className="font-fredoka">{pair.word}</span>
                <img 
                  src={pair.imageUrl} 
                  alt={pair.word}
                  className="w-16 h-16 object-cover rounded-lg ml-auto" 
                />
                <button                   onClick={() => handleRemove(index)}
                  className="absolute top-2 right-2 text-red-500 font-bold text-xl"
                  aria-label="Remove pair"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>

        {pairs.length > 0 && (
          <button             onClick={() => navigate('/quiz')}
            className="w-full mt-8 bg-kitty-blue hover:bg-kitty-pink transition-colors duration-300 text-white font-fredoka py-3 rounded-xl"
          >
            Start Quiz!
          </button>
        )}
      </div>
    </div>
  );
};

export default ParentInput;
