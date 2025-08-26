import { useState, useEffect } from 'react';
import { listBlobImages, BlobImage, ListBlobsOptions } from '../utils/blobStorage';

export interface UseBlobImagesResult {
  images: BlobImage[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * React hook to fetch images from Vercel blob storage
 * 
 * @param options - Options for listing blobs (prefix, limit)
 * @param autoFetch - Whether to automatically fetch on mount (default: true)
 * @returns Object with images, loading state, error, and refetch function
 * 
 * @example
 * ```tsx
 * function Gallery() {
 *   const { images, loading, error } = useBlobImages({ prefix: "gallery/" });
 *   
 *   if (loading) return <div>Loading...</div>;
 *   if (error) return <div>Error: {error}</div>;
 *   
 *   return (
 *     <div>
 *       {images.map(img => (
 *         <img key={img.pathname} src={img.url} alt={img.pathname} />
 *       ))}
 *     </div>
 *   );
 * }
 * ```
 */
export function useBlobImages(
  options: ListBlobsOptions = {},
  autoFetch: boolean = true
): UseBlobImagesResult {
  const [images, setImages] = useState<BlobImage[]>([]);
  const [loading, setLoading] = useState(autoFetch);
  const [error, setError] = useState<string | null>(null);

  const fetchImages = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedImages = await listBlobImages(options);
      setImages(fetchedImages);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      setImages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch) {
      fetchImages();
    }
  }, [JSON.stringify(options), autoFetch]);

  return {
    images,
    loading,
    error,
    refetch: fetchImages
  };
}
