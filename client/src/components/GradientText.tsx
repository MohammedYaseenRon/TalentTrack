import React, { useEffect } from 'react';
import { motion, useAnimationControls } from 'framer-motion';

interface Text {
    text:string;
    className?:string
}

const AnimatedGradientText:React.FC<Text> = ({ text, className }) => {
  const controls = useAnimationControls();
  
  useEffect(() => {
    // Create an infinite animation sequence
    const animateGradient = async () => {
      while (true) {
        await controls.start({
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          transition: { duration: 8, ease: 'linear', repeat: Infinity }
        });
      }
    };
    
    animateGradient();
  }, [controls]);
  
  return (
    <motion.h1
      animate={controls}
      className={`text-4xl md:text-6xl font-bold ${className}`}
      style={{
        backgroundImage: "linear-gradient(90deg,rgb(192, 241, 153), #10b981,rgb(252, 252, 255), #3b82f6)",
        backgroundSize: "300% 100%",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        color: "transparent",
        WebkitTextFillColor: "transparent",
        fontSize:"70px"      
}}
    >
      {text}
    </motion.h1>
  );
};

export default AnimatedGradientText;