import { motion } from 'framer-motion';

export function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] grid place-items-center bg-slate-950 text-white"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <div className="text-center">
        <motion.div
          className="mx-auto grid h-24 w-24 place-items-center rounded-lg border border-white/15 bg-white/10 text-3xl font-black"
          animate={{ rotate: [0, 4, -4, 0], scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 1.4 }}
        >
          DG
        </motion.div>
        <p className="mt-5 text-sm font-black uppercase tracking-[0.28em] text-teal-200">Loading Portfolio</p>
      </div>
    </motion.div>
  );
}
