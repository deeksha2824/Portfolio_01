const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://portfolio-01-6cc2.onrender.com/api';

export function getVisitorId() {
  const key = 'portfolio-visitor-id';
  const existing = localStorage.getItem(key);
  if (existing) return existing;
  const value = crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
  localStorage.setItem(key, value);
  return value;
}

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || 'Request failed.');
  }
  return data;
}

export function submitContact(payload) {
  return request('/contact', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}

export function trackVisit(path = window.location.pathname) {
  return request('/analytics/visit', {
    method: 'POST',
    body: JSON.stringify({ visitorId: getVisitorId(), path })
  });
}

export function trackResumeDownload() {
  return request('/analytics/resume-download', {
    method: 'POST',
    body: JSON.stringify({ visitorId: getVisitorId() })
  });
}

export function getAnalyticsSummary() {
  return request('/analytics/summary');
}
