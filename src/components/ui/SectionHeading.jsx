import { motion } from 'framer-motion';

export function SectionHeading({ eyebrow, title, children, align = 'left' }) {
  return (
    <motion.div
      className={`mb-12 max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.55 }}
    >
      <span className="mb-3 inline-flex rounded-full border border-slate-300/60 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-teal-700 dark:border-white/10 dark:text-teal-200">
        {eyebrow}
      </span>
      <h2 className="text-3xl font-black leading-tight text-slate-950 dark:text-white md:text-5xl">{title}</h2>
      {children && <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-300 md:text-lg">{children}</p>}
    </motion.div>
  );
}
