import { VercelRequest, VercelResponse } from '@vercel/node';
import https from 'https';
import http from 'http';
import { URL } from 'url';

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
      'googleapis.com',
      'stonehamcan.org'
    ];

    const urlObj = new URL(url);
    const isAllowed = allowedDomains.some(domain => 
      urlObj.hostname.endsWith(domain)
    );

    if (!isAllowed) {
      res.status(403).json({ error: 'Domain not allowed' });
      return;
    }

    // Make the request using Node.js built-in modules
    const content = await new Promise((resolve, reject) => {
      const client = urlObj.protocol === 'https:' ? https : http;
      
      const options = {
        hostname: urlObj.hostname,
        port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
        path: urlObj.pathname + urlObj.search,
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; ExploreStoneham-CalendarProxy/1.0)',
          'Accept': 'text/html, application/rss+xml, text/calendar, text/xml, */*'
        }
      };

      const request = client.request(options, (response) => {
        let data = '';
        
        response.on('data', (chunk) => {
          data += chunk;
        });
        
        response.on('end', () => {
          if (response.statusCode >= 200 && response.statusCode < 300) {
            resolve(data);
          } else {
            reject(new Error(`HTTP ${response.statusCode}: ${response.statusMessage}`));
          }
        });
      });

      request.on('error', (error) => {
        reject(error);
      });

      request.setTimeout(10000, () => {
        request.destroy();
        reject(new Error('Request timeout'));
      });

      request.end();
    });
    
    console.log(`Successfully proxied ${typeof content === 'string' ? content.length : 'unknown'} characters from ${url}`);

    // Return the content with proper CORS headers
    res.status(200).json({
      status: 200,
      statusText: 'OK',
      contents: content
    });

  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch URL',
      details: error.message || 'Unknown error'
    });
  }
}