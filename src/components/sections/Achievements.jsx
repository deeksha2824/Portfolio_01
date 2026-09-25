import { Trophy } from 'lucide-react';
import { useEffect, useState } from 'react';
import { achievements, stats } from '../../data/portfolio';
import { GlassCard } from '../ui/GlassCard';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';

export function Achievements() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timeout = window.setTimeout(() => setReady(true), 400);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <section id="achievements" className="section-shell">
      <SectionHeading eyebrow="Achievements" title="Signals of consistency, applied learning, and academic strength." />

      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <GlassCard className="p-6">
            <h3 className="text-2xl font-black">Quick Metrics</h3>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-lg border border-slate-200/80 bg-white/60 p-4 dark:border-white/10 dark:bg-white/[0.05]">
                  <strong className="block text-3xl font-black gradient-text">{ready ? stat.value : '0'}</strong>
                  <span className="text-xs font-black uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">{stat.label}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </Reveal>
        <div className="grid gap-4">
          {achievements.map((achievement, index) => (
            <Reveal key={achievement} delay={index * 0.05}>
              <GlassCard className="flex items-start gap-4 p-5">
                <div className="mt-1 grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-teal-500/12 text-teal-700 dark:text-teal-200">
                  <Trophy size={22} />
                </div>
                <p className="leading-8 text-slate-700 dark:text-slate-200">{achievement}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
