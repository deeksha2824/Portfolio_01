import { Download, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { profile, socials } from '../../data/portfolio';
import { submitContact, trackResumeDownload } from '../../services/api';
import { GlassCard } from '../ui/GlassCard';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';
import { useState } from 'react';

export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '', website: '' });
  const [status, setStatus] = useState({ type: 'idle', message: '' });

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus({ type: 'loading', message: 'Sending your message...' });
    try {
      await submitContact(form);
      setForm({ name: '', email: '', subject: '', message: '', website: '' });
      setStatus({ type: 'success', message: 'Message sent. Thank you animation unlocked.' });
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
    }
  }

  return (
    <section id="contact" className="section-shell pb-20">
      <SectionHeading eyebrow="Contact" title="Let’s connect and talk about the next opportunity." align="center">
        I'm is open to entry-level software, IT, AI, cybersecurity, UI/UX and full-stack development opportunities.
      </SectionHeading>

      <Reveal>
        <GlassCard className="mx-auto max-w-4xl p-6 md:p-8" hover={false}>
          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="rounded-lg bg-slate-950 p-6 text-white">
              <span className="text-sm font-black uppercase tracking-[0.16em] text-teal-200">Contact details</span>
              <h3 className="mt-3 text-3xl font-black">{profile.name}</h3>
              <div className="mt-6 grid gap-4 text-sm text-slate-200">
                <a className="flex items-center gap-3 rounded-lg bg-white/10 p-3 font-bold" href={`tel:${profile.phone.replace(/\s/g, '')}`}>
                  <Phone size={18} />
                  {profile.phone}
                </a>
                <a className="flex items-center gap-3 rounded-lg bg-white/10 p-3 font-bold" href={profile.linkedin} target="_blank" rel="noreferrer">
                  <Linkedin size={18} />
                  LinkedIn Profile
                </a>
                <span className="flex items-center gap-3 rounded-lg bg-white/10 p-3 font-bold">
                  <MapPin size={18} />
                  {profile.location}
                </span>
              </div>
              <div className="mt-6 flex gap-3">
                {socials.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a key={item.label} className="icon-btn h-11 w-11 bg-white/10 text-white" href={item.href} target="_blank" rel="noreferrer" aria-label={item.label} title={item.label}>
                      <Icon />
                    </a>
                  );
                })}
              </div>
            </div>

            <form className="grid gap-4" onSubmit={handleSubmit}>
              <input className="hidden" value={form.website} onChange={(event) => setForm({ ...form, website: event.target.value })} tabIndex="-1" autoComplete="off" aria-hidden="true" />
              {['name', 'email', 'subject'].map((field) => (
                <label className="grid gap-2" key={field}>
                  <span className="text-sm font-black capitalize text-slate-600 dark:text-slate-300">{field}</span>
                  <input
                    className="min-h-12 rounded-lg border border-slate-300 bg-white/80 px-4 outline-none focus:border-teal-500 dark:border-white/10 dark:bg-white/5"
                    type={field === 'email' ? 'email' : 'text'}
                    value={form[field]}
                    onChange={(event) => setForm({ ...form, [field]: event.target.value })}
                    required
                  />
                </label>
              ))}
              <label className="grid gap-2">
                <span className="text-sm font-black text-slate-600 dark:text-slate-300">Message</span>
                <textarea
                  className="min-h-32 resize-y rounded-lg border border-slate-300 bg-white/80 p-4 outline-none focus:border-teal-500 dark:border-white/10 dark:bg-white/5"
                  value={form.message}
                  onChange={(event) => setForm({ ...form, message: event.target.value })}
                  required
                />
              </label>
              {status.message && (
                <div className={`rounded-lg p-3 text-sm font-bold ${status.type === 'success' ? 'bg-teal-500/10 text-teal-700 dark:text-teal-200' : status.type === 'error' ? 'bg-rose-500/10 text-rose-700 dark:text-rose-200' : 'bg-blue-500/10 text-blue-700 dark:text-blue-200'}`}>
                  {status.message}
                </div>
              )}
              <div className="grid gap-3 sm:grid-cols-2">
                <button className="btn-primary focus-ring px-5" type="submit" disabled={status.type === 'loading'}>
                  <Mail size={18} />
                  {status.type === 'loading' ? 'Sending' : 'Send Message'}
                </button>
                <a className="btn-secondary focus-ring px-5" href={profile.resumeUrl} download onClick={() => trackResumeDownload().catch(() => {})}>
                  <Download size={18} />
                  Download Resume
                </a>
              </div>
            </form>
          </div>
        </GlassCard>
      </Reveal>
    </section>
  );
}
