import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS for all origins
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { url } = req.query;

  // Validate URL parameter
  if (!url || typeof url !== 'string') {
    res.status(400).json({ error: 'URL parameter is required' });
    return;
  }

  try {
    console.log(`Proxying request to: ${url}`);

    // Validate that it's a URL we want to proxy
    const allowedDomains = [
      'stoneham-ma.gov',
      'calendar.google.com',
      'googleapis.com'
    ];

    const urlObj = new URL(url);
    const isAllowed = allowedDomains.some(domain => 
      urlObj.hostname.endsWith(domain)
    );

    if (!isAllowed) {
      res.status(403).json({ error: 'Domain not allowed' });
      return;
    }

    // Make the request to the target URL
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'ExploreStoneham-CalendarProxy/1.0',
        'Accept': 'application/rss+xml, text/calendar, text/xml, */*'
      }
    });

    if (!response.ok) {
      console.error(`Upstream error: ${response.status} ${response.statusText}`);
      res.status(response.status).json({ 
        error: `Upstream error: ${response.status} ${response.statusText}` 
      });
      return;
    }

    // Get the content
    const content = await response.text();
    
    console.log(`Successfully proxied ${content.length} characters from ${url}`);

    // Return the content with proper CORS headers
    res.status(200).json({
      status: response.status,
      statusText: response.statusText,
      contents: content,
      headers: Object.fromEntries(response.headers.entries())
    });

  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch URL',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}