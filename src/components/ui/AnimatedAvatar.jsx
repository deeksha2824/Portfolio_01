import { motion, useScroll, useTransform } from 'framer-motion';

export function AnimatedAvatar({ scrollLinked = false }) {
  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, [0, 0.42, 0.72], scrollLinked ? [0, -260, -520] : [0, 0, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], scrollLinked ? [0, 20, -20] : [0, 0, 0]);
  const rotate = useTransform(scrollYProgress, [0, 0.6, 1], scrollLinked ? [0, -2, 2] : [0, 0, 0]);

  return (
    <motion.div
      className={`anime-stage ${scrollLinked ? 'anime-scroll-linked' : ''}`}
      aria-label="Cute full-body anime-style Deeksha developer character"
      style={{ x, y, rotate }}
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.85, ease: 'easeOut' }}
    >
      <div className="anime-portrait-card">
        <img
          className="anime-character-img"
          src="/deeksha-anime.png"
          alt="Cute anime-style full-body illustration of Deeksha Gowda holding a tablet"
          draggable="false"
        />
      </div>

      <motion.div className="anime-badge anime-badge-one" animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 3.2, ease: 'easeInOut' }}>
        React Developer
      </motion.div>
      <motion.div className="anime-badge anime-badge-two" animate={{ y: [0, 12, 0] }} transition={{ repeat: Infinity, duration: 3.8, ease: 'easeInOut' }}>
        AI + Security
      </motion.div>
      <motion.div className="anime-badge anime-badge-three" animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 4.4, ease: 'easeInOut' }}>
        Recruiter-ready
      </motion.div>
    </motion.div>
  );
}
