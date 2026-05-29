export function getRequestMeta(req) {
  const userAgent = req.get('user-agent') || '';
  const country = req.get('cf-ipcountry') || req.get('x-vercel-ip-country') || req.get('x-country') || 'Unknown';
  const forwarded = req.headers['x-forwarded-for'];
  const ipAddress = Array.isArray(forwarded) ? forwarded[0] : String(forwarded || req.ip || '').split(',')[0].trim();

  return {
    country,
    device: getDevice(userAgent),
    ipAddress,
    userAgent
  };
}

function getDevice(userAgent) {
  const value = userAgent.toLowerCase();
  if (/ipad|tablet/.test(value)) return 'Tablet';
  if (/mobile|iphone|android/.test(value)) return 'Mobile';
  if (value) return 'Desktop';
  return 'Unknown';
}
