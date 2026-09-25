import { motion } from 'framer-motion';
import { ArrowDown, Download, Mail, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { profile, stats } from '../../data/portfolio';
import { scrollToSection } from '../../utils/routes';
import { AnimatedAvatar } from '../ui/AnimatedAvatar';

function useTyping(words) {
  const [wordIndex, setWordIndex] = useState(0);
  const [letterCount, setLetterCount] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex];
    const doneTyping = letterCount === current.length;
    const doneDeleting = letterCount === 0;
    const timeout = window.setTimeout(
      () => {
        if (!deleting && doneTyping) {
          setDeleting(true);
          return;
        }
        if (deleting && doneDeleting) {
          setDeleting(false);
          setWordIndex((index) => (index + 1) % words.length);
          return;
        }
        setLetterCount((count) => count + (deleting ? -1 : 1));
      },
      deleting ? 38 : doneTyping ? 1200 : 72
    );

    return () => window.clearTimeout(timeout);
  }, [deleting, letterCount, wordIndex, words]);

  return words[wordIndex].slice(0, letterCount);
}

export function Hero() {
  const typedRole = useTyping(profile.roles);

  return (
    <section id="home" className="relative min-h-screen overflow-hidden soft-grid">
      <div className="section-shell flex min-h-screen items-center pt-28">
        <div className="grid w-full items-center gap-12 lg:grid-cols-[1.06fr_0.94fr]">
          <div>
            <motion.div
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-500/20 bg-teal-500/10 px-4 py-2 text-sm font-black text-teal-700 dark:text-teal-200"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Sparkles size={16} />
              Available for entry-level software and IT roles
            </motion.div>
            <motion.h1
              className="max-w-4xl text-5xl font-black leading-[0.98] text-slate-950 dark:text-white md:text-7xl xl:text-8xl"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1 }}
            >
              {profile.name}
              <span className="gradient-text block">builds useful digital systems.</span>
            </motion.h1>
            <motion.p
              className="mt-6 max-w-2xl text-xl font-bold text-slate-700 dark:text-slate-200 md:text-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="typing-caret gradient-text">{typedRole || profile.roles[0].slice(0, 1)}</span>
            </motion.p>
            <motion.p
              className="mt-5 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300 md:text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {profile.summary}
            </motion.p>
            <motion.div
              className="mt-8 flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.42 }}
            >
              <button className="btn-primary focus-ring px-5" type="button" onClick={() => scrollToSection('projects')}>
                View Projects
                <ArrowDown size={18} />
              </button>
              <a className="btn-secondary focus-ring px-5" href={profile.resumeUrl} download>
                <Download size={18} />
                Download Resume
              </a>
              <button className="btn-secondary focus-ring px-5" type="button" onClick={() => scrollToSection('contact')}>
                <Mail size={18} />
                Contact Me
              </button>
            </motion.div>
          </div>

          <motion.div className="relative" initial={{ opacity: 0, scale: 0.94, y: 26 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.25 }}>
            <AnimatedAvatar scrollLinked />
            <div className="mt-5 grid grid-cols-2 gap-3">
              {stats.map((stat) => (
                <div key={stat.label} className="glass rounded-lg p-4">
                  <strong className="block text-2xl font-black gradient-text">{stat.value}</strong>
                  <span className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-300">{stat.label}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 flex gap-3">
              <a className="icon-btn focus-ring h-12 w-12 border border-slate-300/70 bg-white/70 text-slate-800 dark:border-white/10 dark:bg-white/10 dark:text-white" href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" title="LinkedIn">
                <FaLinkedinIn />
              </a>
              <a className="icon-btn focus-ring h-12 w-12 border border-slate-300/70 bg-white/70 text-slate-800 dark:border-white/10 dark:bg-white/10 dark:text-white" href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" title="GitHub">
                <FaGithub />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
