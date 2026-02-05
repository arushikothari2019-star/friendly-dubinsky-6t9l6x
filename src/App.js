import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export default function ValentineQuiz() {
  const questions = [
    "Sanskar, what made you want to interact with me? 💐",
    "What made you want to go on a second date with me? 🌸",
    "What memories do you want to make with me? 💕",
    "Are you ready for our new life together? 🌷",
    "Sanskar, will you be my Valentine? ❤️",
  ];

  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [answer, setAnswer] = useState("");
  const [showLoveMsg, setShowLoveMsg] = useState(false);
  const [showFinal, setShowFinal] = useState(false);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const audio = document.getElementById("bg-music");
    if (!audio) return;
    audio.volume = 0;
    if (started) {
      let v = 0;
      const fade = setInterval(() => {
        v += 0.02;
        audio.volume = Math.min(v, 0.35);
        if (v >= 0.35) clearInterval(fade);
      }, 120);
    }
  }, [started]);

  const celebrate = () => {
    confetti({ particleCount: 260, spread: 180, origin: { y: 0.6 } });
  };

  const moveNo = () => {
    setNoPos({ x: Math.random() * 260 - 130, y: Math.random() * 260 - 130 });
    setShowLoveMsg(true);
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden flex items-center justify-center p-4 sm:p-6"
      style={{
        backgroundColor: "#f5b6c8",
        backgroundImage:
          'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.45), transparent 50%), url(\'data:image/svg+xml;utf8,<svg xmlns=\\"http://www.w3.org/2000/svg\\" width=\\"200\\" height=\\"200\\" viewBox=\\"0 0 200 200\\"><filter id=\\"n\\"><feTurbulence type=\\"fractalNoise\\" baseFrequency=\\"0.8\\" numOctaves=\\"2\\" stitchTiles=\\"stitch\\"/></filter><rect width=\\"200\\" height=\\"200\\" filter=\\"url(%23n)\\" opacity=\\"0.05\\"/></svg>\')',
      }}
    >
      <audio id="bg-music" autoPlay loop>
        <source
          src="https://cdn.pixabay.com/audio/2022/03/15/audio_7c8c8c5b7b.mp3"
          type="audio/mpeg"
        />
      </audio>

      {/* Floating Roses */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-10 h-10 opacity-80"
          style={{
            backgroundImage:
              'url(\'data:image/svg+xml;utf8,<svg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 64 64\\"><path fill=\\"%23be123c\\" d=\\"M32 6c-8 0-14 6-14 14 0 4 2 7 4 9-6 2-10 8-10 14 0 10 10 18 20 18s20-8 20-18c0-6-4-12-10-14 2-2 4-5 4-9 0-8-6-14-14-14z\\"/></svg>\')',
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
          }}
          initial={{ y: "110vh", x: `${Math.random() * 100}vw`, rotate: 0 }}
          animate={{ y: "-20vh", rotate: 360 }}
          transition={{
            duration: 26 + Math.random() * 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Petals collecting at bottom */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-rose-300/60 to-transparent" />

      <motion.div className="relative z-10 bg-white/85 backdrop-blur-md rounded-[2.8rem] shadow-[0_30px_90px_rgba(190,18,60,0.35)] max-w-md w-full p-6 sm:p-8 text-center border border-rose-300">
        {!started && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="space-y-6"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2.5 }}
              className="text-6xl"
            >
              💌
            </motion.div>
            <h1 className="text-3xl font-bold text-rose-600">For Sanskar</h1>
            <p className="text-gray-600">
              Tap the envelope… let the music begin
            </p>
            <button
              onClick={() => setStarted(true)}
              className="bg-rose-500 hover:bg-rose-600 transition text-white px-8 py-3 rounded-full shadow-lg"
            >
              Open My Heart 💖
            </button>
          </motion.div>
        )}

        {started && !showFinal && (
          <AnimatePresence mode="wait">
            {step < 4 && (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2 className="text-xl font-semibold text-rose-600 mb-4">
                  {questions[step]}
                </h2>
                <textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="w-full border border-rose-300 rounded-2xl p-4 bg-rose-50 focus:ring-2 focus:ring-rose-400"
                  rows={3}
                  placeholder="Think… then write 💭"
                />
                <button
                  disabled={!answer.trim()}
                  onClick={() => {
                    setAnswer("");
                    setStep(step + 1);
                  }}
                  className={`mt-4 px-6 py-2 rounded-full ${
                    answer.trim()
                      ? "bg-rose-500 text-white"
                      : "bg-gray-300 text-gray-500"
                  }`}
                >
                  Next ➜
                </button>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div className="space-y-6">
                <h2 className="text-2xl font-bold text-rose-600">
                  {questions[4]}
                </h2>
                <div className="flex justify-center gap-6 relative">
                  <motion.button
                    onClick={() => {
                      celebrate();
                      setShowFinal(true);
                    }}
                    animate={{
                      boxShadow: [
                        "0 0 0 rgba(190,18,60,0.4)",
                        "0 0 40px rgba(190,18,60,0.9)",
                        "0 0 0 rgba(190,18,60,0.4)",
                      ],
                    }}
                    transition={{ repeat: Infinity, duration: 1.4 }}
                    className="bg-rose-500 text-white px-8 py-3 rounded-full"
                  >
                    Yes 💘
                  </motion.button>
                  <motion.button
                    animate={{ x: noPos.x, y: noPos.y }}
                    transition={{ type: "spring", stiffness: 300 }}
                    onMouseEnter={moveNo}
                    onClick={moveNo}
                    className="bg-gray-200 text-gray-600 px-8 py-3 rounded-full absolute"
                  >
                    No 🙈
                  </motion.button>
                </div>
                {showLoveMsg && (
                  <div className="bg-rose-100 text-rose-600 p-3 rounded-xl">
                    But I love you, Sanskar ❤️
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        )}

        {showFinal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6 relative"
          >
            {/* Moonlight shimmer */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ repeat: Infinity, duration: 6 }}
            />

            {/* Engraved Names */}
            <motion.h2
              initial={{ letterSpacing: "0.4em", opacity: 0 }}
              animate={{ letterSpacing: "0.15em", opacity: 1 }}
              transition={{ duration: 2 }}
              className="text-3xl font-serif text-rose-700"
            >
              Sanskar & Arushi
            </motion.h2>

            <p className="text-gray-700 text-lg leading-relaxed">
              You are the reflection of my soul and I am really glad to have
              found you. And since I found you, I am keeping you forever....
              <br />
              <br />
              Yours for this life and beyond,
              <br />
              <b>Arushi : )</b>
            </p>
            <p className="text-sm text-gray-500">
              📸 Screenshot this moment — it’s ours forever
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
