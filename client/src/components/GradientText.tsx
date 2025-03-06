import React, { useEffect } from 'react';
import { motion, useAnimationControls } from 'framer-motion';

interface Text {
  text: string;
  className?: string;
  fontSize?: string | number;
  backgroundColur?: string
}

const AnimatedGradientText: React.FC<Text> = ({ text, className, fontSize, backgroundColur }) => {
  const controls = useAnimationControls();

  useEffect(() => {
    // Create an infinite animation sequence
    controls.start({
      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      transition: { duration: 8, ease: 'linear', repeat: Infinity }
    });

  }, [controls]);

  return (
    <motion.h1
      animate={controls}
      className={`text-4xl md:text-6xl font-bold ${className}`}
      style={{
        backgroundImage: backgroundColur || "linear-gradient(90deg,rgb(192, 241, 153), #10b981,rgb(252, 252, 255), #3b82f6)",
        backgroundSize: "300% 100%",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        color: "transparent",
        WebkitTextFillColor: "transparent",
        fontSize: typeof fontSize === "number" ? `${fontSize}px` : fontSize,
      }}
    >
      {text}
    </motion.h1>
  );
};

export default AnimatedGradientText;