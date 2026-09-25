import { CheckCircle2, GraduationCap } from 'lucide-react';
import { education, profile } from '../../data/portfolio';
import { GlassCard } from '../ui/GlassCard';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';
import { AnimatedAvatar } from '../ui/AnimatedAvatar';

export function About() {
  return (
    <section id="about" className="section-shell">
      <SectionHeading eyebrow="About me" title="A builder with curiosity across software, AI, and security.">
        I combines core computer science learning with practical projects and internships, turning ideas into usable systems with clean interfaces and thoughtful logic.
      </SectionHeading>

      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <Reveal>
          <GlassCard className="h-full p-6">
            <h3 className="text-2xl font-black">Professional Introduction</h3>
            <p className="mt-4 leading-8 text-slate-600 dark:text-slate-300">{profile.summary}</p>
            <p className="mt-4 leading-8 text-slate-600 dark:text-slate-300">
              My journey is shaped by a project-first approach: learning React and backend fundamentals, exploring AI through semantic retrieval, and applying security concepts through steganography.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {profile.strengths.map((strength) => (
                <div key={strength} className="flex items-center gap-3 rounded-lg bg-slate-950/4 p-3 font-bold text-slate-700 dark:bg-white/6 dark:text-slate-200">
                  <CheckCircle2 className="text-teal-600 dark:text-teal-300" size={18} />
                  {strength}
                </div>
              ))}
            </div>
          </GlassCard>
        </Reveal>

        <div className="grid gap-6">
          <Reveal delay={0.04}>
            <div className="scale-[0.88]">
              <AnimatedAvatar />
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <GlassCard className="p-6">
              <div className="mb-5 flex items-center gap-3">
                <GraduationCap className="text-blue-600 dark:text-blue-300" />
                <h3 className="text-2xl font-black">Education Timeline</h3>
              </div>
              <div className="space-y-4">
                {education.map((item) => (
                  <div key={item.title} className="relative rounded-lg border border-slate-200/70 bg-white/50 p-5 dark:border-white/10 dark:bg-white/4">
                    <span className="text-sm font-black text-teal-700 dark:text-teal-200">{item.period}</span>
                    <h4 className="mt-2 text-lg font-black">{item.title}</h4>
                    <p className="mt-1 text-slate-600 dark:text-slate-300">{item.place}</p>
                    <strong className="mt-3 inline-flex rounded-full bg-blue-500/10 px-3 py-1 text-sm text-blue-700 dark:text-blue-200">{item.meta}</strong>
                  </div>
                ))}
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
