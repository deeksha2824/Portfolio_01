import { Award } from 'lucide-react';
import { certifications } from '../../data/portfolio';
import { GlassCard } from '../ui/GlassCard';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';

export function Certifications() {
  return (
    <section id="certifications" className="section-shell">
      <SectionHeading eyebrow="Certifications" title="Security and cryptography learning backed by recognized programs." />

      <div className="grid gap-5 md:grid-cols-2">
        {certifications.map((certification, index) => (
          <Reveal key={certification} delay={index * 0.05}>
            <GlassCard className="flex h-full items-center gap-5 p-6">
              <div className="grid h-14 w-14 shrink-0 place-items-center rounded-lg bg-orange-500/12 text-orange-600 dark:text-orange-300">
                <Award size={26} />
              </div>
              <div>
                <span className="text-xs font-black uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">Credential</span>
                <h3 className="mt-1 text-lg font-black">{certification}</h3>
              </div>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
