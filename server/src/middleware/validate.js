const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value) {
  return String(value || '').trim();
}

export function validateContact(req, res, next) {
  const name = clean(req.body.name);
  const email = clean(req.body.email).toLowerCase();
  const subject = clean(req.body.subject);
  const message = clean(req.body.message);
  const website = clean(req.body.website);

  if (website) {
    return res.status(400).json({ message: 'Spam protection rejected this submission.' });
  }

  if (name.length < 2 || name.length > 80) {
    return res.status(400).json({ message: 'Name must be between 2 and 80 characters.' });
  }

  if (!emailPattern.test(email) || email.length > 120) {
    return res.status(400).json({ message: 'Enter a valid email address.' });
  }

  if (subject.length < 3 || subject.length > 140) {
    return res.status(400).json({ message: 'Subject must be between 3 and 140 characters.' });
  }

  if (message.length < 10 || message.length > 2000) {
    return res.status(400).json({ message: 'Message must be between 10 and 2000 characters.' });
  }

  req.body = { name, email, subject, message };
  next();
}
