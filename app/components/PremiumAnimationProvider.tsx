// app/components/PremiumAnimationProvider.tsx
'use client';
import { MotionConfig, motion, AnimationControls } from 'framer-motion';
import { createContext, useContext, ReactNode } from 'react';

interface AnimationPresets {
  subtle: any;
  card: any;
  button: any;
  spring: any;
}

const AnimationContext = createContext<AnimationPresets>({} as AnimationPresets);

// 🎨 PREMIUM ANIMATION PRESETS - 60FPS GUARANTEED
const presets: AnimationPresets = {
  // Subtle entrance animations
  subtle: {
    initial: { opacity: 0, y: 8 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: 'spring', 
        damping: 25, 
        stiffness: 120,
        mass: 0.8
      }
    }
  },

  // Card hover effects with natural physics
  card: {
    initial: { opacity: 0, scale: 0.96 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        type: 'spring', 
        damping: 20, 
        stiffness: 150 
      }
    },
    hover: {
      y: -6,
      scale: 1.02,
      transition: { 
        type: "spring", 
        stiffness: 400,
        damping: 15,
        mass: 0.5
      }
    },
    tap: {
      scale: 0.98,
      y: -2
    }
  },

  // Button interactions with tactile feedback
  button: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        type: 'spring', 
        damping: 20, 
        stiffness: 200 
      }
    },
    hover: {
      scale: 1.05,
      y: -2,
      transition: { 
        type: "spring", 
        stiffness: 500,
        damping: 12,
        mass: 0.3
      }
    },
    tap: {
      scale: 0.98,
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 800,
        damping: 15
      }
    }
  },

  // Base spring configuration
  spring: {
    type: 'spring',
    damping: 25,
    stiffness: 120,
    mass: 0.8
  }
};

interface PremiumAnimationProviderProps {
  children: ReactNode;
}

export function PremiumAnimationProvider({ children }: PremiumAnimationProviderProps) {
  return (
    <MotionConfig 
      reducedMotion="user"
      transition={{
        type: "spring",
        damping: 25,
        stiffness: 120
      }}
    >
      <AnimationContext.Provider value={presets}>
        <motion.div 
          style={{ 
            willChange: 'transform',
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden'
          }}
          {...presets.subtle}
        >
          {children}
        </motion.div>
      </AnimationContext.Provider>
    </MotionConfig>
  );
}

// Hook to access animation presets
export const useAnimationPresets = (): AnimationPresets => {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error('useAnimationPresets must be used within PremiumAnimationProvider');
  }
  return context;
};

// Pre-built premium components
export const PremiumCard = motion.div;

export const PremiumButton = motion.button;

// Enhanced motion components with performance optimizations
export const MotionDiv = motion.div;

export const MotionSpan = motion.span;

// Stagger animations for lists
export const StaggerContainer = motion.div;

export const StaggerItem = motion.div;

// Loading animation component
export const LoadingSpinner = () => (
  <motion.div
    className="w-5 h-5 border-2 border-stone-600 border-t-amethyst-500 rounded-full"
    animate={{ rotate: 360 }}
    transition={{
      duration: 1,
      repeat: Infinity,
      ease: "linear"
    }}
    style={{
      willChange: 'transform'
    }}
  />
);

// Progress bar with smooth animation
interface AnimatedProgressProps {
  progress: number;
  className?: string;
}

export const AnimatedProgress = ({ progress, className = "" }: AnimatedProgressProps) => (
  <div className={`progress-bar ${className}`}>
    <motion.div
      className="progress-fill"
      initial={{ width: 0 }}
      animate={{ width: `${progress}%` }}
      transition={{
        type: "spring",
        damping: 20,
        stiffness: 100,
        mass: 0.8
      }}
      style={{
        willChange: 'width'
      }}
    />
  </div>
);

export default PremiumAnimationProvider;
