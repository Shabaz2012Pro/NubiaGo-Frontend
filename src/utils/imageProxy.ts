
export const getProxiedImageUrl = (originalUrl: string): string => {
  // For development, return original URL
  if (!originalUrl || originalUrl.startsWith('data:') || originalUrl.startsWith('blob:')) {
    return originalUrl;
  }

  // For external images, add proxy if needed
  if (originalUrl.includes('pexels.com') || originalUrl.includes('unsplash.com')) {
    return originalUrl; // These services support CORS
  }

  // For other external images, you might need a proxy
  return originalUrl;
};

export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
};
