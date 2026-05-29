import { ArrowUp } from 'lucide-react';
import { profile, socials } from '../../data/portfolio';
import { trackResumeDownload } from '../../services/api';
import { scrollToSection } from '../../utils/routes';

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-slate-200/70 px-4 py-10 dark:border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 text-sm text-slate-600 dark:text-slate-400 md:flex-row md:items-center md:justify-between">
        <div>
          <strong className="block text-base text-slate-950 dark:text-white">{profile.name}</strong>
          <span>Built with React, Vite, Tailwind CSS, Framer Motion, and React Icons.</span>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {socials.map((item) => {
            const Icon = item.icon;
            return (
              <a
                className="icon-btn focus-ring h-10 w-10 border border-slate-300/70 text-slate-700 dark:border-white/10 dark:text-slate-200"
                href={item.href}
                key={item.label}
                target="_blank"
                rel="noreferrer"
                aria-label={item.label}
                title={item.label}
              >
                <Icon />
              </a>
            );
          })}
          <button className="btn-secondary focus-ring h-10 px-4 text-sm" type="button" onClick={() => scrollToSection('home')}>
            <ArrowUp size={16} />
            Top
          </button>
          <a className="btn-primary focus-ring h-10 px-4 text-sm" href={profile.resumeUrl} download onClick={() => trackResumeDownload().catch(() => {})}>
            Resume
          </a>
        </div>
      </div>
    </footer>
  );
}
