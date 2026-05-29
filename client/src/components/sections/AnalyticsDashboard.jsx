import { BarChart3 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getAnalyticsSummary } from '../../services/api';
import { GlassCard } from '../ui/GlassCard';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';

const fallback = {
  totalVisitors: 0,
  resumeDownloads: 0,
  countries: [{ label: 'Unknown', value: 0 }],
  devices: [{ label: 'Desktop', value: 0 }]
};

export function AnalyticsDashboard() {
  const [summary, setSummary] = useState(fallback);

  useEffect(() => {
    getAnalyticsSummary().then(setSummary).catch(() => {});
  }, []);

  return (
    <section id="analytics" className="section-shell">
      <SectionHeading eyebrow="Visitor Analytics" title="MongoDB-backed portfolio insights." />
      <div className="grid gap-5 lg:grid-cols-4">
        <Reveal>
          <GlassCard className="p-5">
            <BarChart3 className="text-teal-600 dark:text-teal-200" />
            <span className="mt-5 block text-sm font-black uppercase tracking-[0.16em] text-slate-500">Total Visitors</span>
            <strong className="mt-2 block text-4xl font-black">{summary.totalVisitors}</strong>
          </GlassCard>
        </Reveal>
        <Reveal delay={0.04}>
          <GlassCard className="p-5">
            <BarChart3 className="text-orange-600 dark:text-orange-200" />
            <span className="mt-5 block text-sm font-black uppercase tracking-[0.16em] text-slate-500">Resume Downloads</span>
            <strong className="mt-2 block text-4xl font-black">{summary.resumeDownloads}</strong>
          </GlassCard>
        </Reveal>
        <Reveal delay={0.08} className="lg:col-span-2">
          <GlassCard className="p-5">
            <h3 className="font-black">Country and Device Breakdown</h3>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {[...summary.countries, ...summary.devices].map((item) => (
                <div key={`${item.label}-${item.value}`} className="rounded-lg bg-slate-950/5 p-3 dark:bg-white/10">
                  <span className="text-sm font-bold text-slate-500 dark:text-slate-400">{item.label}</span>
                  <strong className="float-right">{item.value}</strong>
                </div>
              ))}
            </div>
          </GlassCard>
        </Reveal>
      </div>
    </section>
  );
}
