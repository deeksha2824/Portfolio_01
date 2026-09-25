import { motion } from 'framer-motion';
import { skills } from '../../data/portfolio';
import { GlassCard } from '../ui/GlassCard';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';

export function Skills() {
  const orbitSkills = skills
    .flatMap((group) => group.items)
    .slice(0, 12);

  return (
    <section id="skills" className="section-shell">
      <SectionHeading
        eyebrow="Skills"
        title="A practical stack for building, securing, and presenting products."
      >
        Skills are grouped around how Deeksha works: interface development,
        backend APIs, database thinking, core programming, tooling, and
        people-facing communication.
      </SectionHeading>

      {/* ================= SKILL CARDS ================= */}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {skills.map((group, index) => {
          const Icon = group.icon;

          return (
            <Reveal key={group.category} delay={index * 0.04}>
              <GlassCard className="group h-full p-6">
                <div className="mb-6 flex items-center justify-between gap-4">
                  <motion.div
                    whileHover={{ rotate: 8, scale: 1.08 }}
                    className="grid h-14 w-14 place-items-center rounded-2xl bg-slate-950 text-2xl text-white shadow-lg transition dark:bg-white dark:text-slate-950"
                  >
                    <Icon />
                  </motion.div>

                  <span className="rounded-full bg-teal-500/10 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-teal-700 dark:text-teal-200">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <h3 className="text-xl font-black">
                  {group.category}
                </h3>

                <div className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <motion.span
                      key={skill}
                      whileHover={{ y: -2, scale: 1.03 }}
                      className="rounded-xl border border-slate-200 bg-white/60 px-3 py-2 text-sm font-bold text-slate-700 shadow-sm transition dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </GlassCard>
            </Reveal>
          );
        })}
      </div>

      {/* ================= SKILLS ORBIT ================= */}

      <div className="skills-orbit-section mt-16 overflow-hidden rounded-[2rem] border border-slate-800 bg-[#071113] p-6 text-white shadow-2xl md:p-10">

        {/* Header */}
        <div className="relative z-10 mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-teal-400/20 bg-teal-400/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-teal-300">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-teal-300" />
              Skills Galaxy
            </span>

            <h3 className="mt-3 text-3xl font-black md:text-4xl">
              My technical universe
            </h3>
          </div>

          <p className="max-w-md text-sm leading-6 text-slate-400">
            Explore the technologies I use to design, develop, secure and
            present digital experiences.
          </p>
        </div>

        {/* Galaxy */}
        <div className="relative mx-auto flex h-[520px] w-full max-w-[850px] items-center justify-center overflow-hidden">

          {/* Background glow */}
          <div className="pointer-events-none absolute h-72 w-72 rounded-full bg-teal-400/10 blur-[100px]" />

          {/* Stars */}
          <span className="star star-1" />
          <span className="star star-2" />
          <span className="star star-3" />
          <span className="star star-4" />
          <span className="star star-5" />
          <span className="star star-6" />

          {/* OUTER ORBIT */}
          <motion.div
            className="absolute h-[440px] w-[440px] rounded-full border border-teal-300/10"
            animate={{ rotate: 360 }}
            transition={{
              duration: 35,
              repeat: Infinity,
              ease: 'linear',
            }}
          />

          {/* MIDDLE ORBIT */}
          <motion.div
            className="absolute h-[330px] w-[330px] rounded-full border border-cyan-300/15"
            animate={{ rotate: -360 }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: 'linear',
            }}
          />

          {/* INNER ORBIT */}
          <motion.div
            className="absolute h-[220px] w-[220px] rounded-full border border-teal-300/20"
            animate={{ rotate: 360 }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: 'linear',
            }}
          />

          {/* Central Core */}
          <motion.div
            className="relative z-20 flex h-32 w-32 items-center justify-center rounded-full border border-teal-300/30 bg-gradient-to-br from-teal-300/20 via-slate-900 to-cyan-400/10 shadow-[0_0_70px_rgba(45,212,191,0.25)] backdrop-blur-xl"
            animate={{
              scale: [1, 1.04, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <div className="absolute inset-3 rounded-full border border-white/10" />

            <div className="text-center">
              <span className="block text-3xl font-black tracking-tight">
                DG
              </span>

              <span className="mt-1 block text-[9px] font-bold uppercase tracking-[0.25em] text-teal-300">
                Creative Tech
              </span>
            </div>
          </motion.div>

          {/* Orbit planets */}
          {orbitSkills.map((skill, index) => {
            const orbit = index % 3;

            const orbitSize =
              orbit === 0 ? 440 : orbit === 1 ? 330 : 220;

            const duration =
              orbit === 0 ? 35 : orbit === 1 ? 25 : 18;

            const angle =
              (360 / Math.ceil(orbitSkills.length / 3)) *
              Math.floor(index / 3);

            return (
              <motion.div
                key={skill}
                className="absolute"
                style={{
                  width: orbitSize,
                  height: orbitSize,
                }}
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: -(duration * angle) / 360,
                }}
              >
                <motion.div
                  className="absolute left-1/2 top-0 -translate-x-1/2"
                  whileHover={{ scale: 1.18 }}
                >
                  <div
                    className="skill-planet whitespace-nowrap rounded-full border border-teal-300/20 bg-slate-900/90 px-3 py-2 text-[11px] font-black text-slate-200 shadow-[0_0_25px_rgba(45,212,191,0.12)] backdrop-blur-xl transition hover:border-teal-300/60 hover:text-teal-200"
                  >
                    <span className="mr-1.5 text-teal-300">✦</span>
                    {skill}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom label */}
        <div className="relative z-10 mt-3 flex justify-center">
          <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-slate-400 backdrop-blur-xl">
            Hover over a skill to explore
          </div>
        </div>
      </div>
    </section>
  );
}
