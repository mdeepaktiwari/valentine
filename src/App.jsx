import React, { useState } from "react";

export default function ValentineProposal() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });

  const handleNo = () => {
    setNoCount(noCount + 1);
    const newX = Math.random() * 60 - 30;
    const newY = Math.random() * 60 - 30;
    setNoPosition({ x: newX, y: newY });
  };

  const handleYes = () => {
    setYesPressed(true);
  };

  if (yesPressed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-100 to-red-100 flex items-center justify-center overflow-hidden relative">
        {/* Floating hearts celebration */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute text-4xl animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.1}s`,
              animationDuration: "2s",
            }}
          >
            ❤️
          </div>
        ))}

        {/* Confetti */}
        {[...Array(50)].map((_, i) => (
          <div
            key={`confetti-${i}`}
            className="absolute w-3 h-3 rounded-full animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: "-20px",
              backgroundColor: [
                "#ff6b9d",
                "#c44569",
                "#ffa07a",
                "#ff85a2",
                "#ffb3d9",
              ][Math.floor(Math.random() * 5)],
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}

        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-16 text-center max-w-2xl border-4 border-pink-200 relative z-10">
          <div className="text-8xl mb-6 animate-bounce">💕</div>
          <h1 className="text-6xl font-bold bg-gradient-to-r from-pink-500 via-red-500 to-pink-500 bg-clip-text text-transparent mb-6">
            Yay!!!
          </h1>
          <p className="text-3xl text-gray-700 font-semibold mb-4">
            You just made me the happiest person alive!
          </p>
          <p className="text-xl text-gray-600">I knew you'd say yes! 💖✨</p>
          <div className="mt-8 flex gap-3 justify-center text-4xl">
            <span className="animate-pulse">💐</span>
            <span className="animate-pulse" style={{ animationDelay: "0.2s" }}>
              🌹
            </span>
            <span className="animate-pulse" style={{ animationDelay: "0.4s" }}>
              💝
            </span>
            <span className="animate-pulse" style={{ animationDelay: "0.6s" }}>
              🌹
            </span>
            <span className="animate-pulse" style={{ animationDelay: "0.8s" }}>
              💐
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 flex items-center justify-center overflow-hidden relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-pink-300 opacity-20 text-4xl"
            style={{
              left: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 5}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      {/* Main card */}
      <div className="relative z-10 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-12 md:p-20 max-w-3xl mx-4 border-4 border-pink-200">
        {/* Top heart decoration */}
        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 text-8xl animate-pulse">
          💘
        </div>

        {/* Question */}
        <h1 className="text-5xl md:text-7xl font-bold text-center mb-12 bg-gradient-to-r from-pink-600 via-rose-500 to-red-600 bg-clip-text text-transparent leading-tight">
          Will You Be My Valentine?
        </h1>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center min-h-[100px] relative">
          {/* YES button */}
          <button
            onClick={handleYes}
            className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white text-3xl font-bold py-6 px-16 rounded-full shadow-lg hover:shadow-2xl transform hover:scale-110 transition-all duration-300 hover:rotate-2"
          >
            YES! 💖
          </button>

          {/* NO button - moves away */}
          <button
            onMouseEnter={handleNo}
            style={{
              transform: `translate(${noPosition.x}vw, ${noPosition.y}vh)`,
              transition: "transform 0.3s ease-out",
            }}
            onTouchStart={(e) => {
              e.preventDefault();
              handleNo();
            }}
            className="bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white text-3xl font-bold py-6 px-16 rounded-full shadow-lg hover:shadow-2xl transform hover:scale-110 transition-all duration-300 hover:rotate-2"
          >
            NO! 😢
          </button>
        </div>

        {/* Bottom decoration */}
        <div className="mt-12 flex justify-center gap-4 text-4xl">
          <span className="animate-bounce" style={{ animationDelay: "0s" }}>
            🌹
          </span>
          <span className="animate-bounce" style={{ animationDelay: "0.1s" }}>
            💝
          </span>
          <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>
            🌹
          </span>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10%,
          90% {
            opacity: 0.4;
          }
          50% {
            transform: translateY(50vh) rotate(180deg);
          }
        }
      `}</style>
    </div>
  );
}
