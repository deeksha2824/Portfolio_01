import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { Footer } from './components/layout/Footer';
import { Navbar } from './components/layout/Navbar';
import { About } from './components/sections/About';
import { Achievements } from './components/sections/Achievements';
import { Certifications } from './components/sections/Certifications';
import { Contact } from './components/sections/Contact';
import { Experience } from './components/sections/Experience';
import { GitHubActivity } from './components/sections/GitHubActivity';
import { Hero } from './components/sections/Hero';
import { Projects } from './components/sections/Projects';
import { Skills } from './components/sections/Skills';
import { Testimonials } from './components/sections/Testimonials';
import { AIAssistant } from './components/ui/AIAssistant';
import { CustomCursor } from './components/ui/CustomCursor';
import { LoadingScreen } from './components/ui/LoadingScreen';
import { ThemeProvider } from './hooks/useTheme';
import { navItems } from './utils/routes';

function PortfolioShell() {
  const [activeSection, setActiveSection] = useState(navItems[0].id);
  const [loading, setLoading] = useState(true);
  const sections = useMemo(
    () => [
      <Hero key="home" />,
      <About key="about" />,
      <Skills key="skills" />,
      <Experience key="experience" />,
      <Projects key="projects" />,
      <Certifications key="certifications" />,
      <Achievements key="achievements" />,
      <Testimonials key="testimonials" />,
      <GitHubActivity key="github" />,
      <Contact key="contact" />
    ],
    []
  );

  useEffect(() => {
    const timeout = window.setTimeout(() => setLoading(false), 950);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50 text-slate-950 transition-colors duration-500 dark:bg-[#050713] dark:text-white">
      <AnimatePresence>{loading && <LoadingScreen />}</AnimatePresence>
      <div className="site-aura" aria-hidden="true" />
      <CustomCursor />
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
      <AnimatePresence mode="wait">
        <motion.main
          key="portfolio"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
        >
          {sections}
        </motion.main>
      </AnimatePresence>
      <Footer />
      <AIAssistant />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <PortfolioShell />
    </ThemeProvider>
  );
}
