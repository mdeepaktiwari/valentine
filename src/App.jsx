import React, { useState, useEffect, useRef } from "react";

export default function ValentineProposal() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [sparkles, setSparkles] = useState([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  // Track mouse for sparkle trail
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      // Add sparkle at mouse position occasionally
      if (Math.random() > 0.85) {
        const newSparkle = {
          id: Date.now() + Math.random(),
          x: e.clientX,
          y: e.clientY,
        };
        setSparkles(prev => [...prev.slice(-20), newSparkle]);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Clean up sparkles
  useEffect(() => {
    const interval = setInterval(() => {
      setSparkles(prev => prev.slice(-15));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const handleNo = () => {
    setNoCount(noCount + 1);
    // More dramatic escape
    const angle = Math.random() * Math.PI * 2;
    const distance = 15 + Math.random() * 20;
    const newX = Math.cos(angle) * distance;
    const newY = Math.sin(angle) * distance;
    setNoPosition({ x: newX, y: newY });
  };

  const handleYes = () => {
    setYesPressed(true);
  };

  const getNoButtonText = () => {
    const phrases = [
      "No 😢",
      "Are you sure? 🥺",
      "Pretty please? 💔",
      "Think again! 😿",
      "Give me a chance? 🌹",
      "Don't be cruel 💕",
      "I'll be sad... 😭",
      "You're breaking my heart 💗",
      "Reconsider? 🥹",
      "Please... 🙏",
    ];
    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  const yesButtonSize = Math.min(1 + noCount * 0.15, 2.5);

  if (yesPressed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-200 via-rose-300 to-red-200 flex items-center justify-center overflow-hidden relative">
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-pink-400/20 via-transparent to-rose-400/20 animate-pulse" />
        
        {/* Floating hearts celebration - more dramatic */}
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float-up"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: `-50px`,
              fontSize: `${20 + Math.random() * 40}px`,
              animationDelay: `${i * 0.15}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
              filter: `blur(${Math.random() > 0.7 ? 2 : 0}px)`,
            }}
          >
            {["❤️", "💕", "💖", "💗", "💝", "💘", "💓", "🌹", "✨"][Math.floor(Math.random() * 9)]}
          </div>
        ))}

        {/* Sparkle burst effect */}
        {[...Array(30)].map((_, i) => (
          <div
            key={`sparkle-${i}`}
            className="absolute animate-sparkle-burst"
            style={{
              left: `50%`,
              top: `50%`,
              transform: `rotate(${i * 12}deg)`,
              animationDelay: `${i * 0.05}s`,
            }}
          >
            <div 
              className="text-2xl"
              style={{
                animation: `moveOut 2s ease-out infinite`,
                animationDelay: `${i * 0.05}s`,
              }}
            >
              ✨
            </div>
          </div>
        ))}

        {/* Main celebration card */}
        <div className="relative z-10 bg-white/95 backdrop-blur-2xl rounded-[40px] shadow-[0_25px_100px_rgba(236,72,153,0.4)] p-10 md:p-16 text-center max-w-2xl mx-4 border-2 border-pink-200 animate-celebration-pop">
          {/* Glowing ring effect */}
          <div className="absolute inset-0 rounded-[40px] bg-gradient-to-r from-pink-400 via-rose-400 to-pink-400 opacity-20 blur-xl animate-pulse" />
          
          <div className="relative z-10">
            {/* Animated heart */}
            <div className="text-[100px] mb-4 animate-heartbeat inline-block">
              💕
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black mb-6 animate-shimmer bg-gradient-to-r from-pink-500 via-red-500 via-pink-500 to-red-500 bg-[length:200%_100%] bg-clip-text text-transparent">
              Yay!!!
            </h1>
            
            <p className="text-2xl md:text-3xl text-gray-700 font-semibold mb-3 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              You just made me the happiest person alive!
            </p>
            
            <p className="text-lg md:text-xl text-gray-500 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              I knew you'd say yes! Can't wait to spend Valentine's with you 💖✨
            </p>
            
            {/* Animated emoji row */}
            <div className="mt-10 flex gap-4 justify-center text-4xl md:text-5xl">
              {['💐', '🌹', '💝', '🍫', '💌'].map((emoji, i) => (
                <span 
                  key={i}
                  className="animate-bounce-slow inline-block hover:scale-125 transition-transform cursor-pointer"
                  style={{ animationDelay: `${i * 0.15}s` }}
                >
                  {emoji}
                </span>
              ))}
            </div>

            {/* Love message */}
            <div className="mt-8 p-6 bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl border border-pink-200">
              <p className="text-pink-600 font-medium italic text-lg">
                "You are my today and all of my tomorrows" 💕
              </p>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes float-up {
            0% { transform: translateY(0) rotate(0deg) scale(1); opacity: 1; }
            100% { transform: translateY(-100vh) rotate(360deg) scale(0.5); opacity: 0; }
          }
          .animate-float-up { animation: float-up linear infinite; }
          
          @keyframes heartbeat {
            0%, 100% { transform: scale(1); }
            10% { transform: scale(1.15); }
            20% { transform: scale(1); }
            30% { transform: scale(1.15); }
            40% { transform: scale(1); }
          }
          .animate-heartbeat { animation: heartbeat 1.5s ease-in-out infinite; }
          
          @keyframes shimmer {
            0% { background-position: 200% center; }
            100% { background-position: -200% center; }
          }
          .animate-shimmer { animation: shimmer 3s linear infinite; }
          
          @keyframes fade-in-up {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; opacity: 0; }
          
          @keyframes bounce-slow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-15px); }
          }
          .animate-bounce-slow { animation: bounce-slow 2s ease-in-out infinite; }
          
          @keyframes celebration-pop {
            0% { transform: scale(0.5); opacity: 0; }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); opacity: 1; }
          }
          .animate-celebration-pop { animation: celebration-pop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
          
          @keyframes moveOut {
            0% { transform: translateX(0); opacity: 1; }
            100% { transform: translateX(200px); opacity: 0; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-50 to-red-100 flex items-center justify-center overflow-hidden relative"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-tr from-pink-200/50 via-transparent to-rose-200/50 animate-gradient-shift" />
      
      {/* Sparkle trail effect */}
      {sparkles.map(sparkle => (
        <div
          key={sparkle.id}
          className="fixed pointer-events-none z-50 animate-sparkle-fade"
          style={{
            left: sparkle.x,
            top: sparkle.y,
            transform: 'translate(-50%, -50%)',
          }}
        >
          ✨
        </div>
      ))}

      {/* Floating background hearts */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              fontSize: `${15 + Math.random() * 30}px`,
              opacity: 0.15 + Math.random() * 0.15,
              animationDuration: `${8 + Math.random() * 8}s`,
              animationDelay: `${Math.random() * 8}s`,
            }}
          >
            {["❤️", "💕", "💗", "🌸", "✨"][Math.floor(Math.random() * 5)]}
          </div>
        ))}
      </div>

      {/* Soft glow orbs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-pink-300/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-rose-300/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-red-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

      {/* Main card */}
      <div className="relative z-10 bg-white/90 backdrop-blur-2xl rounded-[40px] shadow-[0_25px_80px_rgba(236,72,153,0.25)] p-8 md:p-16 max-w-3xl mx-4 border border-pink-200/50 animate-card-entrance">
        {/* Decorative corner hearts */}
        <div className="absolute -top-6 -left-6 text-5xl animate-wiggle">💝</div>
        <div className="absolute -top-6 -right-6 text-5xl animate-wiggle" style={{ animationDelay: '0.5s' }}>💖</div>
        <div className="absolute -bottom-6 -left-6 text-5xl animate-wiggle" style={{ animationDelay: '1s' }}>💕</div>
        <div className="absolute -bottom-6 -right-6 text-5xl animate-wiggle" style={{ animationDelay: '1.5s' }}>💗</div>

        {/* Top heart decoration with glow */}
        <div className="absolute -top-20 left-1/2 transform -translate-x-1/2">
          <div className="relative">
            <div className="absolute inset-0 text-8xl blur-lg opacity-50 animate-pulse">💘</div>
            <div className="text-8xl animate-heartbeat relative z-10">💘</div>
          </div>
        </div>

        {/* Subtitle */}
        <p className="text-center text-pink-400 font-medium text-lg mb-4 animate-fade-in tracking-widest uppercase">
          A Special Question...
        </p>

        {/* Main Question */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-center mb-4 leading-tight">
          <span className="bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 bg-clip-text text-transparent animate-text-glow">
            Will You Be
          </span>
          <br />
          <span className="bg-gradient-to-r from-red-500 via-pink-500 to-rose-500 bg-clip-text text-transparent animate-text-glow" style={{ animationDelay: '0.5s' }}>
            My Valentine?
          </span>
        </h1>

        {/* Sweet message */}
        <p className="text-center text-gray-500 text-lg mb-10 max-w-md mx-auto">
          Every moment with you is a treasure I hold dear to my heart 💕
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center min-h-[120px] relative">
          {/* YES button - grows with each "no" */}
          <button
            onClick={handleYes}
            style={{ transform: `scale(${yesButtonSize})` }}
            className="relative group bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 bg-[length:200%_100%] hover:bg-right text-white text-2xl md:text-3xl font-bold py-5 px-12 md:py-6 md:px-16 rounded-full shadow-[0_10px_40px_rgba(236,72,153,0.4)] hover:shadow-[0_15px_50px_rgba(236,72,153,0.6)] transform hover:scale-105 transition-all duration-500 overflow-hidden"
          >
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <span className="relative z-10 flex items-center gap-2">
              YES! <span className="animate-pulse">💖</span>
            </span>
          </button>

          {/* NO button - escapes */}
          <button
            onMouseEnter={handleNo}
            onTouchStart={(e) => {
              e.preventDefault();
              handleNo();
            }}
            style={{
              transform: `translate(${noPosition.x}vw, ${noPosition.y}vh)`,
              transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
            className="bg-gradient-to-r from-gray-300 to-gray-400 hover:from-gray-400 hover:to-gray-500 text-gray-700 text-xl md:text-2xl font-semibold py-4 px-10 md:py-5 md:px-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {getNoButtonText()}
          </button>
        </div>

        {/* Hint text after few attempts */}
        {noCount > 2 && (
          <p className="text-center text-pink-400 text-sm mt-6 animate-fade-in">
            Psst... the YES button is looking pretty good, isn't it? 😉
          </p>
        )}

        {/* Bottom decoration */}
        <div className="mt-12 flex justify-center gap-3 text-3xl md:text-4xl">
          {['🌹', '💝', '🌸', '💝', '🌹'].map((emoji, i) => (
            <span 
              key={i}
              className="animate-bounce-gentle hover:scale-125 transition-transform cursor-pointer" 
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {emoji}
            </span>
          ))}
        </div>

        {/* Decorative line */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <div className="h-px w-20 bg-gradient-to-r from-transparent to-pink-300" />
          <span className="text-pink-300 text-2xl">♡</span>
          <div className="h-px w-20 bg-gradient-to-l from-transparent to-pink-300" />
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(100vh) rotate(0deg); 
            opacity: 0;
          }
          10% { opacity: 0.3; }
          90% { opacity: 0.3; }
          100% { 
            transform: translateY(-100vh) rotate(360deg); 
            opacity: 0;
          }
        }
        .animate-float { animation: float linear infinite; }
        
        @keyframes gradient-shift {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }
        .animate-gradient-shift { animation: gradient-shift 4s ease-in-out infinite; }
        
        @keyframes wiggle {
          0%, 100% { transform: rotate(-5deg) scale(1); }
          50% { transform: rotate(5deg) scale(1.1); }
        }
        .animate-wiggle { animation: wiggle 2s ease-in-out infinite; }
        
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          10% { transform: scale(1.1); }
          20% { transform: scale(1); }
          30% { transform: scale(1.1); }
          40% { transform: scale(1); }
        }
        .animate-heartbeat { animation: heartbeat 1.5s ease-in-out infinite; }
        
        @keyframes card-entrance {
          0% { 
            opacity: 0; 
            transform: translateY(30px) scale(0.95);
          }
          100% { 
            opacity: 1; 
            transform: translateY(0) scale(1);
          }
        }
        .animate-card-entrance { animation: card-entrance 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        
        @keyframes text-glow {
          0%, 100% { filter: drop-shadow(0 0 10px rgba(236, 72, 153, 0.3)); }
          50% { filter: drop-shadow(0 0 20px rgba(236, 72, 153, 0.6)); }
        }
        .animate-text-glow { animation: text-glow 2s ease-in-out infinite; }
        
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-bounce-gentle { animation: bounce-gentle 2s ease-in-out infinite; }
        
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.6s ease-out forwards; }
        
        @keyframes sparkle-fade {
          0% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(0) rotate(180deg); }
        }
        .animate-sparkle-fade { animation: sparkle-fade 0.8s ease-out forwards; }
      `}</style>
    </div>
  );
}
