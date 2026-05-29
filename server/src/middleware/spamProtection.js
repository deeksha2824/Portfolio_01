const submissions = new Map();

export function contactSpamProtection(req, res, next) {
  const key = req.ip || req.headers['x-forwarded-for'] || 'unknown';
  const now = Date.now();
  const windowMs = Number(process.env.CONTACT_RATE_WINDOW_MS || 15 * 60 * 1000);
  const max = Number(process.env.CONTACT_RATE_LIMIT || 5);
  const recent = (submissions.get(key) || []).filter((timestamp) => now - timestamp < windowMs);

  if (recent.length >= max) {
    return res.status(429).json({ message: 'Too many messages. Please try again later.' });
  }

  recent.push(now);
  submissions.set(key, recent);
  next();
}
