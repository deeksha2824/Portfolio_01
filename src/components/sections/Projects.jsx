import { AnimatePresence, motion } from 'framer-motion';
import { ExternalLink, Github, X } from 'lucide-react';
import { useState } from 'react';
import { projects, technologyIcons } from '../../data/portfolio';
import { GlassCard } from '../ui/GlassCard';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';

export function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className="section-shell">
      <SectionHeading eyebrow="Projects" title="Project work with clear problems, useful workflows, and polished presentation.">
        These showcases use resume projects as the core content, with placeholders ready for screenshots, repository URLs, and live demos.
      </SectionHeading>

      <div className="grid gap-6 lg:grid-cols-3">
        {projects.map((project, index) => (
          <Reveal key={project.title} delay={index * 0.06}>
            <GlassCard className="flex h-full flex-col overflow-hidden">
              <div className={`relative min-h-52 bg-linear-to-br ${project.gradient} p-5 text-white`}>
                <div className="absolute inset-0 opacity-25 soft-grid" />
                <div className="relative flex h-full min-h-44 flex-col justify-between">
                  <span className="w-fit rounded-full bg-white/20 px-3 py-1 text-xs font-black uppercase tracking-[0.16em]">Project Image</span>
                  <div>
                    <span className="text-5xl font-black opacity-90">0{index + 1}</span>
                    <p className="mt-2 max-w-xs text-sm font-bold text-white/80">Replace this gradient panel with a real screenshot when available.</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-2xl font-black">{project.title}</h3>
                <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">{project.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => {
                    const Icon = technologyIcons[tech] || Github;
                    return (
                      <span key={tech} className="inline-flex items-center gap-2 rounded-lg bg-slate-950/5 px-3 py-2 text-sm font-bold dark:bg-white/6">
                        <Icon />
                        {tech}
                      </span>
                    );
                  })}
                </div>
                <div className="mt-5">
                  <h4 className="text-sm font-black uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">Key features</h4>
                  <ul className="mt-3 grid gap-2 text-sm text-slate-600 dark:text-slate-300">
                    {project.features.map((feature) => (
                      <li key={feature} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-auto flex flex-wrap gap-3 pt-6">
                  <a className="btn-secondary focus-ring min-h-11 px-4 text-sm" href={project.github} target="_blank" rel="noreferrer">
                    <Github size={16} />
                    GitHub
                  </a>
                  <button className="btn-primary focus-ring min-h-11 px-4 text-sm" type="button" onClick={() => setSelectedProject(project)}>
                    <ExternalLink size={16} />
                    Details
                  </button>
                </div>
              </div>
            </GlassCard>
          </Reveal>
        ))}
      </div>
      <AnimatePresence>
        {selectedProject && (
          <motion.div className="fixed inset-0 z-90 grid place-items-center bg-slate-950/70 p-4 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="glass max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-lg" initial={{ opacity: 0, y: 40, scale: 0.94 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 30, scale: 0.96 }}>
              <div className={`min-h-48 bg-linear-to-br ${selectedProject.gradient} p-6 text-white`}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-black uppercase tracking-[0.16em]">Floating Detail View</span>
                    <h3 className="mt-5 text-4xl font-black">{selectedProject.title}</h3>
                  </div>
                  <button className="icon-btn h-11 w-11 bg-white/20 text-white" type="button" onClick={() => setSelectedProject(null)} aria-label="Close project details">
                    <X size={20} />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <p className="text-lg leading-8 text-slate-700 dark:text-slate-200">{selectedProject.description}</p>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="font-black">Technologies</h4>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech) => <span className="rounded-lg bg-slate-950/5 px-3 py-2 text-sm font-bold dark:bg-white/10" key={tech}>{tech}</span>)}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-black">Key Features</h4>
                    <ul className="mt-3 grid gap-2 text-slate-600 dark:text-slate-300">
                      {selectedProject.features.map((feature) => <li key={feature}>{feature}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
