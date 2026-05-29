import { motion } from 'framer-motion';

export function GlassCard({ children, className = '', hover = true }) {
  return (
    <motion.article
      className={`glass rounded-lg ${className}`}
      whileHover={hover ? { y: -6, scale: 1.01 } : undefined}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
    >
      {children}
    </motion.article>
  );
}
