import { VercelRequest, VercelResponse } from '@vercel/node';
import { list } from "@vercel/blob";

// Cache for a minute so we're not crying over cold starts
export const config = {
  maxDuration: 30,
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const prefix = (req.query.prefix as string) ?? "";
  const limit = Number(req.query.limit ?? "100");

  try {
    // Lists blobs under a folder-like prefix, e.g. "Test/"
    const { blobs } = await list({ prefix, limit });

    // Return only images; shape is lightweight for the client
    const images = blobs
      .filter(b => (b.contentType ?? "").startsWith("image/"))
      .map(b => ({
        url: b.url,
        pathname: b.pathname,
        contentType: b.contentType,
        size: b.size,
        uploadedAt: b.uploadedAt
      }));

    // Cache for 60 seconds
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
    return res.status(200).json({ images });
  } catch (error) {
    console.error('Error listing blobs:', error);
    return res.status(500).json({ error: 'Failed to list blobs' });
  }
}
