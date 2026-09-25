import { Code2, GraduationCap, MapPin, Rocket } from 'lucide-react';
import { experience } from '../../data/portfolio';
import { GlassCard } from '../ui/GlassCard';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';

export function Experience() {
  const journey = [
    { label: 'Student', icon: GraduationCap, text: 'B.E. Computer Science foundation' },
    { label: 'Builder', icon: Code2, text: 'React, Node, projects, and APIs' },
    { label: 'Specialist', icon: Rocket, text: 'AI, cybersecurity, and blockchain exposure' }
  ];

  return (
    <section id="experience" className="section-shell">
      <SectionHeading eyebrow="Experience" title="Internships that connect theory with hands-on practice.">
        Each internship adds a different lens: artificial intelligence, cybersecurity, and decentralized systems.
      </SectionHeading>

      <div className="relative grid gap-5 before:absolute before:left-5 before:top-4 before:hidden before:h-[calc(100%-32px)] before:w-px before:bg-slate-300 dark:before:bg-white/15 md:before:block">
        {experience.map((item, index) => {
          const Icon = item.icon;
          return (
            <Reveal key={`${item.company}-${item.role}`} delay={index * 0.06}>
              <div className="relative grid gap-4 md:grid-cols-[52px_1fr]">
                <div className="hidden h-11 w-11 place-items-center rounded-lg bg-slate-950 text-white shadow-lg dark:bg-white dark:text-slate-950 md:grid">
                  <Icon />
                </div>
                <GlassCard className="p-6">
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <span className="text-sm font-black uppercase tracking-[0.16em] text-teal-700 dark:text-teal-200">{item.period}</span>
                      <h3 className="mt-2 text-2xl font-black">{item.role}</h3>
                      <p className="mt-1 font-bold text-slate-600 dark:text-slate-300">{item.company}</p>
                    </div>
                    <span className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-3 py-1 text-sm font-bold text-blue-700 dark:text-blue-200">
                      <MapPin size={15} />
                      {item.location}
                    </span>
                  </div>
                  <ul className="mt-5 grid gap-3 text-slate-600 dark:text-slate-300">
                    {item.points.map((point) => (
                      <li key={point} className="flex gap-3 leading-7">
                        <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </div>
            </Reveal>
          );
        })}
      </div>
      <div className="mt-14 grid gap-4 md:grid-cols-3">
        {journey.map((step, index) => {
          const Icon = step.icon;
          return (
            <Reveal key={step.label} delay={index * 0.05}>
              <GlassCard className="p-5 text-center">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-lg bg-teal-500/10 text-teal-700 dark:text-teal-200">
                  <Icon />
                </div>
                <h3 className="mt-4 text-xl font-black">{step.label}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{step.text}</p>
              </GlassCard>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
