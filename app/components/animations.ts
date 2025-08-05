'use client';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';

// Advanced animation variants
export const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }
  }
};

export const fadeInLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }
  }
};

export const fadeInRight = {
  initial: { opacity: 0, x: 60 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }
  }
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
};

// Floating animation
export const floating = {
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Pulse glow effect
export const pulseGlow = {
  animate: {
    boxShadow: [
      "0 0 20px rgba(59, 130, 246, 0.3)",
      "0 0 40px rgba(59, 130, 246, 0.5)",
      "0 0 20px rgba(59, 130, 246, 0.3)"
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Advanced hover animations
export const hoverLift = {
  whileHover: {
    y: -8,
    scale: 1.02,
    transition: { duration: 0.3, ease: "easeOut" }
  },
  whileTap: {
    y: -2,
    scale: 0.98,
    transition: { duration: 0.1 }
  }
};

export const hoverGlow = {
  whileHover: {
    boxShadow: "0 20px 80px rgba(59, 130, 246, 0.4)",
    transition: { duration: 0.3 }
  }
};

// Magnetic button effect
export const magneticButton = {
  whileHover: {
    scale: 1.05,
    transition: { duration: 0.3, ease: "easeOut" }
  },
  whileTap: {
    scale: 0.95,
    transition: { duration: 0.1 }
  }
};

// Animated text gradient
export const textShimmer = {
  animate: {
    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

// Scroll-triggered animation hook
export const useScrollAnimation = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (inView) {
      controls.start("animate");
    }
  }, [controls, inView]);

  return { ref, controls };
};

// Advanced loading animation
export const loadingSpinner = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

// Morphing shape animation
export const morphingShape = {
  animate: {
    borderRadius: ["20px", "50px", "20px"],
    rotate: [0, 180, 360],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Page transition variants
export const pageTransition = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 1.05 },
  transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
};

// Parallax effect
export const parallaxY = (factor: number) => ({
  animate: {
    y: factor,
    transition: { duration: 0 }
  }
});

// Interactive card animation
export const cardAnimation = {
  initial: { opacity: 0, y: 50, rotateX: -15 },
  animate: { 
    opacity: 1, 
    y: 0, 
    rotateX: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  },
  whileHover: {
    y: -10,
    rotateX: 5,
    scale: 1.02,
    transition: { duration: 0.3 }
  }
};

// Typewriter effect
export const typewriter = {
  animate: {
    width: ["0%", "100%"],
    transition: {
      duration: 2,
      ease: "easeInOut"
    }
  }
};

export default {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  scaleIn,
  staggerContainer,
  staggerItem,
  floating,
  pulseGlow,
  hoverLift,
  hoverGlow,
  magneticButton,
  textShimmer,
  loadingSpinner,
  morphingShape,
  pageTransition,
  parallaxY,
  cardAnimation,
  typewriter,
  useScrollAnimation
};
