import { testimonials } from '../../data/portfolio';
import { GlassCard } from '../ui/GlassCard';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';

export function Testimonials() {
  return (
    <section id="testimonials" className="section-shell">
      <SectionHeading eyebrow="Testimonials" title="Recruiter-friendly proof points and portfolio-ready social signals." />
      <div className="grid gap-5 md:grid-cols-3">
        {testimonials.map((item, index) => (
          <Reveal key={item.name} delay={index * 0.05}>
            <GlassCard className="h-full p-6">
              <p className="text-lg leading-8 text-slate-700 dark:text-slate-200">"{item.quote}"</p>
              <div className="mt-6">
                <strong className="block font-black">{item.name}</strong>
                <span className="text-sm font-bold text-slate-500 dark:text-slate-400">{item.role}</span>
              </div>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
