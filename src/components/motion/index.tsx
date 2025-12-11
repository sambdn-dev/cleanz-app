'use client';

import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ReactNode } from 'react';

// ===== VARIANTS =====

// Fade in from bottom with stagger for children
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 24,
    },
  },
};

// Modal animations
export const modalOverlay: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

export const modalContent: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 25,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: {
      duration: 0.2,
    },
  },
};

// Heart/favorite animation
export const heartBeat: Variants = {
  initial: { scale: 1 },
  tap: { scale: 0.8 },
  liked: {
    scale: [1, 1.3, 1],
    transition: {
      duration: 0.3,
      times: [0, 0.5, 1],
    },
  },
};

// Star rating cascade
export const starCascade: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: (i: number) => ({
    scale: 1,
    opacity: 1,
    transition: {
      delay: i * 0.05,
      type: 'spring',
      stiffness: 500,
      damping: 15,
    },
  }),
};

// Tab indicator slide
export const tabIndicator: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.2 },
  },
};

// Card press effect
export const cardPress: Variants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.02,
    transition: { duration: 0.2 },
  },
  tap: {
    scale: 0.98,
    transition: { duration: 0.1 },
  },
};

// Scroll reveal
export const scrollReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

// ===== COMPONENTS =====

// Staggered list container
interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export const StaggerContainer = ({ children, className, delay = 0.1 }: StaggerContainerProps) => (
  <motion.div
    className={className}
    variants={{
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: {
          staggerChildren: 0.08,
          delayChildren: delay,
        },
      },
    }}
    initial="hidden"
    animate="show"
  >
    {children}
  </motion.div>
);

// Staggered item
interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

export const StaggerItem = ({ children, className }: StaggerItemProps) => (
  <motion.div
    className={className}
    variants={staggerItem}
  >
    {children}
  </motion.div>
);

// Animated card with hover/tap effects
interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export const AnimatedCard = ({ children, className, onClick, style }: AnimatedCardProps) => (
  <motion.div
    className={className}
    style={style}
    onClick={onClick}
    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
    whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
  >
    {children}
  </motion.div>
);

// Scroll reveal wrapper
interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export const ScrollReveal = ({ children, className, delay = 0 }: ScrollRevealProps) => (
  <motion.div
    className={className}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-50px' }}
    variants={{
      hidden: { opacity: 0, y: 30 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          delay,
          ease: 'easeOut',
        },
      },
    }}
  >
    {children}
  </motion.div>
);

// Animated heart button
interface AnimatedHeartProps {
  isLiked: boolean;
  onClick: (e: React.MouseEvent) => void;
  className?: string;
  children: ReactNode;
  style?: React.CSSProperties;
}

export const AnimatedHeart = ({ isLiked, onClick, className, children, style }: AnimatedHeartProps) => (
  <motion.button
    className={className}
    style={style}
    onClick={onClick}
    whileTap={{ scale: 0.85 }}
    animate={isLiked ? { scale: [1, 1.3, 1] } : { scale: 1 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.button>
);

// Animated star for ratings
interface AnimatedStarProps {
  index: number;
  isActive: boolean;
  onClick: () => void;
  children: ReactNode;
  className?: string;
}

export const AnimatedStar = ({ index, isActive, onClick, children, className }: AnimatedStarProps) => (
  <motion.button
    className={className}
    onClick={onClick}
    initial={{ scale: 0, opacity: 0 }}
    animate={{
      scale: 1,
      opacity: 1,
    }}
    whileHover={{ scale: 1.2 }}
    whileTap={{ scale: 0.9 }}
    transition={{
      delay: index * 0.05,
      type: 'spring',
      stiffness: 500,
      damping: 15,
    }}
  >
    <motion.span
      animate={isActive ? { scale: [1, 1.2, 1] } : {}}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.span>
  </motion.button>
);

// Page transition wrapper
interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

export const PageTransition = ({ children, className }: PageTransitionProps) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

// Export AnimatePresence for use in other components
export { AnimatePresence, motion };
