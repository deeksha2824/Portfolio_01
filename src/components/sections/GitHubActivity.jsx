import { Github } from 'lucide-react';
import { githubActivity, profile } from '../../data/portfolio';
import { GlassCard } from '../ui/GlassCard';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';

export function GitHubActivity() {
  return (
    <section id="github" className="section-shell">
      <SectionHeading eyebrow="GitHub Activity" title="A curated activity feed for project momentum." />
      <div className="grid gap-4">
        {githubActivity.map((item, index) => (
          <Reveal key={item.label} delay={index * 0.04}>
            <GlassCard className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-slate-950 text-white dark:bg-white dark:text-slate-950">
                  <Github size={22} />
                </div>
                <div>
                  <span className="text-xs font-black uppercase tracking-[0.16em] text-teal-700 dark:text-teal-200">{item.type}</span>
                  <h3 className="mt-1 text-xl font-black">{item.label}</h3>
                  <p className="mt-1 text-slate-600 dark:text-slate-300">{item.detail}</p>
                </div>
              </div>
              <a className="btn-secondary focus-ring min-h-11 px-4 text-sm" href={profile.github} target="_blank" rel="noreferrer">
                View GitHub
              </a>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
