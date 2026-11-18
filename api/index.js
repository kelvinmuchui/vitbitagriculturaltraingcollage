import app from '../server.js';

export default function handler(req, res) {
  const parsedUrl = new URL(req.url || '/', 'http://localhost');
  const vercelPath = parsedUrl.searchParams.get('__vercel_path');

  if (vercelPath !== null) {
    parsedUrl.searchParams.delete('__vercel_path');
    const cleanPath = vercelPath.replace(/^\/+/, '');
    const remainingQuery = parsedUrl.searchParams.toString();
    req.url = `/api/${cleanPath}${remainingQuery ? `?${remainingQuery}` : ''}`;
  }

  return app(req, res);
}
