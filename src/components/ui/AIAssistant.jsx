import { Bot, Send, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { experience, profile, projects, skills } from '../../data/portfolio';

const starters = ['Who is Deeksha?', 'What are her skills?', 'Tell me about projects', 'Any HR recruitment experience?'];

function answerQuestion(input) {
  const question = input.toLowerCase();
  if (question.includes('project')) {
    return `Deeksha's highlighted projects are ${projects.map((project) => project.title).join(', ')}. They cover AI semantic retrieval, cybersecurity steganography, and full-stack exam seating automation.`;
  }
  if (question.includes('skill') || question.includes('tech')) {
    return `Her skills include ${skills.map((group) => `${group.category}: ${group.items.join(', ')}`).join(' | ')}.`;
  }
  if (question.includes('intern') || question.includes('experience')) {
    return `Internship experience: ${experience.map((item) => `${item.role} at ${item.company} (${item.period})`).join('; ')}.`;
  }
  if (question.includes('hr') || question.includes('recruit')) {
    return 'The resume does not list formal HR recruitment work. The portfolio includes people-facing strengths relevant to recruitment contexts: communication, resume-screening awareness, interview readiness, and candidate empathy.';
  }
  if (question.includes('contact') || question.includes('hire')) {
    return `You can contact Deeksha through LinkedIn (${profile.linkedin}) or the contact form on this page.`;
  }
  return `${profile.name} is a final-year Computer Science Engineering student focused on React, Node.js, AI, cybersecurity, and practical full-stack projects.`;
}

export function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([{ role: 'bot', text: 'Hi, I can answer questions about Deeksha, her skills, internships, projects, and recruitment-facing strengths.' }]);
  const quickPrompts = useMemo(() => starters, []);

  function ask(text = input) {
    const value = text.trim();
    if (!value) return;
    setMessages((current) => [...current, { role: 'user', text: value }, { role: 'bot', text: answerQuestion(value) }]);
    setInput('');
  }

  return (
    <div className="fixed bottom-5 right-5 z-[70]">
      {open && (
        <div className="glass mb-3 w-[min(380px,calc(100vw-40px))] overflow-hidden rounded-lg">
          <div className="flex items-center justify-between bg-slate-950 p-4 text-white">
            <div className="flex items-center gap-2 font-black">
              <Bot size={20} />
              Portfolio AI
            </div>
            <button className="icon-btn h-9 w-9 bg-white/10" onClick={() => setOpen(false)} type="button" aria-label="Close AI assistant">
              <X size={17} />
            </button>
          </div>
          <div className="max-h-80 space-y-3 overflow-y-auto p-4">
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={`rounded-lg p-3 text-sm leading-6 ${message.role === 'bot' ? 'bg-slate-950/5 dark:bg-white/10' : 'ml-8 bg-teal-500 text-white'}`}>
                {message.text}
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 px-4 pb-3">
            {quickPrompts.map((prompt) => (
              <button key={prompt} className="rounded-full bg-slate-950/5 px-3 py-1 text-xs font-bold dark:bg-white/10" type="button" onClick={() => ask(prompt)}>
                {prompt}
              </button>
            ))}
          </div>
          <form className="flex gap-2 border-t border-slate-200 p-3 dark:border-white/10" onSubmit={(event) => { event.preventDefault(); ask(); }}>
            <input className="min-h-11 flex-1 rounded-lg border border-slate-300 bg-white px-3 text-sm outline-none dark:border-white/10 dark:bg-slate-950" value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask about Deeksha..." />
            <button className="btn-primary h-11 w-11" type="submit" aria-label="Send message">
              <Send size={17} />
            </button>
          </form>
        </div>
      )}
      <button className="btn-primary focus-ring h-14 w-14 rounded-lg" type="button" onClick={() => setOpen((value) => !value)} aria-label="Open AI assistant">
        <Bot size={22} />
      </button>
    </div>
  );
}
