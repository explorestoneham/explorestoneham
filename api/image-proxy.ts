import { VercelRequest, VercelResponse } from '@vercel/node';
import https from 'https';
import http from 'http';
import { URL } from 'url';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS for all origins
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
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
    console.log(`Image proxy request to: ${url}`);

    // Validate that it's an image URL we want to proxy
    const allowedDomains = [
      'images.squarespace-cdn.com',
      'static1.squarespace.com',
      'stonehamcan.org',
      's3.amazonaws.com',
      'ai-assets.s3.amazonaws.com',
      // Google Places photo domains
      'maps.googleapis.com',
      'lh3.googleusercontent.com',
      'lh4.googleusercontent.com',
      'lh5.googleusercontent.com',
      'lh6.googleusercontent.com',
      'geo0.ggpht.com',
      'geo1.ggpht.com',
      'geo2.ggpht.com',
      'geo3.ggpht.com'
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
    const { imageData, responseHeaders } = await new Promise<{imageData: Buffer, responseHeaders: any}>((resolve, reject) => {
      const client = urlObj.protocol === 'https:' ? https : http;
      
      const options = {
        hostname: urlObj.hostname,
        port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
        path: urlObj.pathname + urlObj.search,
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; ExploreStoneham-ImageProxy/1.0)',
          'Accept': 'image/*,*/*;q=0.8',
          'Referer': 'https://www.stonehamcan.org/'
        }
      };

      const request = client.request(options, (response) => {
        const chunks: Buffer[] = [];
        
        response.on('data', (chunk: Buffer) => {
          chunks.push(chunk);
        });
        
        response.on('end', () => {
          if (response.statusCode && response.statusCode >= 200 && response.statusCode < 300) {
            const buffer = Buffer.concat(chunks);
            resolve({ imageData: buffer, responseHeaders: response.headers });
          } else if (response.statusCode && (response.statusCode === 301 || response.statusCode === 302 || response.statusCode === 307 || response.statusCode === 308)) {
            // Handle redirects
            const location = response.headers.location;
            if (location) {
              console.log(`Following redirect to: ${location}`);
              // Recursively make request to redirect location
              const redirectUrlObj = new URL(location, url); // Handle relative URLs

              // Validate redirect URL is to an allowed domain
              const isRedirectAllowed = allowedDomains.some(domain =>
                redirectUrlObj.hostname.endsWith(domain)
              );

              if (!isRedirectAllowed) {
                reject(new Error(`Redirect to disallowed domain: ${redirectUrlObj.hostname}`));
                return;
              }

              const redirectClient = redirectUrlObj.protocol === 'https:' ? https : http;

              const redirectOptions = {
                hostname: redirectUrlObj.hostname,
                port: redirectUrlObj.port || (redirectUrlObj.protocol === 'https:' ? 443 : 80),
                path: redirectUrlObj.pathname + redirectUrlObj.search,
                method: 'GET',
                headers: {
                  'User-Agent': 'Mozilla/5.0 (compatible; ExploreStoneham-ImageProxy/1.0)',
                  'Accept': 'image/*,*/*;q=0.8',
                  'Referer': 'https://www.stonehamcan.org/'
                }
              };

              const redirectRequest = redirectClient.request(redirectOptions, (redirectResponse) => {
                const redirectChunks: Buffer[] = [];

                redirectResponse.on('data', (chunk: Buffer) => {
                  redirectChunks.push(chunk);
                });

                redirectResponse.on('end', () => {
                  if (redirectResponse.statusCode && redirectResponse.statusCode >= 200 && redirectResponse.statusCode < 300) {
                    const buffer = Buffer.concat(redirectChunks);
                    resolve({ imageData: buffer, responseHeaders: redirectResponse.headers });
                  } else {
                    reject(new Error(`HTTP ${redirectResponse.statusCode}: ${redirectResponse.statusMessage}`));
                  }
                });
              });

              redirectRequest.on('error', (error) => {
                reject(error);
              });

              redirectRequest.setTimeout(15000, () => {
                redirectRequest.destroy();
                reject(new Error('Redirect request timeout'));
              });

              redirectRequest.end();
            } else {
              reject(new Error(`HTTP ${response.statusCode}: ${response.statusMessage} - No redirect location`));
            }
          } else {
            reject(new Error(`HTTP ${response.statusCode}: ${response.statusMessage}`));
          }
        });
      });

      request.on('error', (error) => {
        reject(error);
      });

      request.setTimeout(15000, () => {
        request.destroy();
        reject(new Error('Request timeout'));
      });

      request.end();
    });
    
    console.log(`Successfully proxied ${imageData.length} bytes from ${url}`);

    // Set appropriate headers for image response
    res.setHeader('Content-Type', 'image/jpeg'); // Default, will be overridden by specific type detection
    res.setHeader('Cache-Control', 'public, max-age=86400'); // Cache for 24 hours
    
    // Try to detect content type from response headers first, then fall back to URL
    const contentType = responseHeaders['content-type'];
    if (contentType && contentType.startsWith('image/')) {
      res.setHeader('Content-Type', contentType);
    } else {
      // Fall back to URL-based detection
      const urlLower = url.toLowerCase();
      if (urlLower.includes('.png')) {
        res.setHeader('Content-Type', 'image/png');
      } else if (urlLower.includes('.gif')) {
        res.setHeader('Content-Type', 'image/gif');
      } else if (urlLower.includes('.webp')) {
        res.setHeader('Content-Type', 'image/webp');
      } else if (urlLower.includes('.svg')) {
        res.setHeader('Content-Type', 'image/svg+xml');
      }
    }

    // Return the image data directly
    res.status(200).send(imageData);

  } catch (error) {
    console.error('Image proxy error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch image',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}