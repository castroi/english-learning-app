import React, { useState, useEffect } from 'react';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const ItemTypes = {
  IMAGE: 'image'
};

const Word = ({ word, isCorrectMatch, onMatch }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.IMAGE,
    drop: (item) => onMatch(word, item.imageUrl),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`p-4 rounded-xl font-fredoka text-xl ${
        isOver ? 'bg-kitty-yellow' : 'bg-kitty-pink/20'
      }`}
    >
      {word}
      {
       
      (isCorrectMatch ? (
        <span className="text-green-500 text-2xl">✔️</span>
      ) : (
        <span className="text-red-500 text-2xl">❌</span>
      ))}
    </div>
  );
};

const DraggableImage = ({ url, word }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.IMAGE,
    item: { imageUrl: url },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`cursor-move ${isDragging ? 'opacity-50' : ''}`}
    >
      <img
        src={url}
        alt={word}
        className="w-[150px] h-[150px] object-cover rounded-xl shadow-lg"
      />
    </div>
  );
};

const Quiz = () => {
  const [pairs, setPairs] = useState([]);
  const [matches, setMatches] = useState({});
  const [showResults, setShowResults] = useState(false);

  const loadPairs = () => {
    const savedPairs = localStorage.getItem('wordImagePairs');
    if (savedPairs) {
      setPairs(JSON.parse(savedPairs));
    }
  };
  useEffect(() => {
    loadPairs();
  }, []);


  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const handleMatch = (word, imageUrl) => {
    setMatches(prev => ({
      ...prev,
      [word]: imageUrl
    }));
    
    setPairs(prevPairs =>
      prevPairs.map(pair =>
        pair.word === word
          ? { ...pair, isCorrectMatch: pair.imageUrl === imageUrl }
          : pair
      )
    );
  };

  const checkAnswers = () => {
    setShowResults(true);
  };

  const resetQuiz = () => {
    const savedPairs = localStorage.getItem('wordImagePairs');
    if (savedPairs) {
      const parsedPairs = JSON.parse(savedPairs);
      const resetPairs = parsedPairs.map(pair => ({
        ...pair,
        isCorrectMatch: false
      }));
      setPairs(resetPairs);
    }
    setMatches({});
    setShowResults(false);
  };

  const isCorrectMatch = (word, imageUrl) => {
    const pair = pairs.find(p => p.word === word);
    return pair.imageUrl === imageUrl;
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gradient-to-r from-kitty-blue to-kitty-pink p-8">
        <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl p-8">
          <h1 className="text-4xl font-fredoka text-kitty-pink text-center mb-8 animate-float">
            Match the Words!
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h2 className="font-fredoka text-2xl text-kitty-blue mb-4">Words</h2>
              {pairs.map(pair => (
                <Word
                  key={pair.word}
                  word={pair.word}
                  isCorrectMatch = {pair.isCorrectMatch}
                  onMatch={handleMatch}
                />
              ))}
            </div>

            <div className="space-y-4">
              <h2 className="font-fredoka text-2xl text-kitty-blue mb-4">Images</h2>
              <div className="grid grid-cols-2 gap-4">
                {shuffleArray(pairs).map(pair => (
                  <DraggableImage
                    key={pair.imageUrl}
                    url={pair.imageUrl}
                    word={pair.word}
                  />
                ))}
              </div>
            </div>
          </div>

          {showResults && (
            <div className="mt-8 space-y-4">
              <h2 className="font-fredoka text-2xl text-kitty-pink">Results:</h2>
              {Object.entries(matches).map(([word, imageUrl]) => (
                <div key={word} className="flex items-center space-x-4">
                  <span className="font-fredoka">{word}</span>
                  {isCorrectMatch(word, imageUrl) ? (
                    <span className="text-green-500 text-2xl">✔️</span>
                  ) : (
                    <span className="text-red-500 text-2xl">❌</span>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 flex space-x-4">
            <button
              onClick={checkAnswers}
              className="flex-1 bg-kitty-pink hover:bg-kitty-blue transition-colors duration-300 text-white font-fredoka py-3 rounded-xl"
            >
              Check Answers
            </button>
            <button
              onClick={resetQuiz}
              className="flex-1 bg-kitty-blue hover:bg-kitty-pink transition-colors duration-300 text-white font-fredoka py-3 rounded-xl"
            >
              Reset Quiz
            </button>
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default Quiz;