import { skills } from '../../data/portfolio';
import { GlassCard } from '../ui/GlassCard';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';

export function Skills() {
  return (
    <section id="skills" className="section-shell">
      <SectionHeading eyebrow="Skills" title="A practical stack for building, securing, and presenting products.">
        Skills are grouped around how Deeksha works: interface development, backend APIs, database thinking, core programming, tooling, and people-facing communication.
      </SectionHeading>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {skills.map((group, index) => {
          const Icon = group.icon;
          return (
            <Reveal key={group.category} delay={index * 0.04}>
              <GlassCard className="group h-full p-6">
                <div className="mb-6 flex items-center justify-between gap-4">
                  <div className="grid h-14 w-14 place-items-center rounded-lg bg-slate-950 text-2xl text-white transition group-hover:rotate-3 dark:bg-white dark:text-slate-950">
                    <Icon />
                  </div>
                  <span className="rounded-full bg-teal-500/10 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-teal-700 dark:text-teal-200">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="text-xl font-black">{group.category}</h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg border border-slate-200 bg-white/60 px-3 py-2 text-sm font-bold text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </Reveal>
          );
        })}
      </div>
      <div className="mt-16 overflow-hidden rounded-lg border border-slate-200/70 bg-slate-950 p-8 text-white dark:border-white/10">
        <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-xs font-black uppercase tracking-[0.18em] text-teal-200">Skills Galaxy</span>
            <h3 className="mt-2 text-3xl font-black">Animated orbiting skill planets</h3>
          </div>
          <p className="max-w-md text-sm leading-6 text-slate-300">A visual map of Deeksha's technical universe, designed as a recruiter-friendly interaction point.</p>
        </div>
        <div className="skills-galaxy mx-auto">
          {skills.flatMap((group) => group.items.slice(0, 2)).slice(0, 10).map((skill, index) => (
            <span key={skill} className="planet" style={{ '--i': index, '--total': 10 }}>{skill}</span>
          ))}
          <strong>DG</strong>
        </div>
      </div>
    </section>
  );
}
