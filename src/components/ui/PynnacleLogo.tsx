// Renders the Pynnacle logo. In dark mode, uses canvas to strip the white
// background so the dark page shows through behind the character.

import { useEffect, useState } from 'react';
import { useThemeStore } from '@store/useThemeStore';

interface Props {
  className?: string;
}

export function PynnacleLogo({ className }: Props) {
  const src = `${import.meta.env.BASE_URL}avatars/avatar-1.png`;
  const darkMode = useThemeStore((s) => s.darkMode);
  const [processedSrc, setProcessedSrc] = useState<string | null>(null);

  useEffect(() => {
    if (!darkMode) {
      setProcessedSrc(null);
      return;
    }

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth || 64;
      canvas.height = img.naturalHeight || 64;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);
      try {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const { data } = imageData;
        // Make near-white pixels transparent (threshold 240/255)
        for (let i = 0; i < data.length; i += 4) {
          if (data[i] > 240 && data[i + 1] > 240 && data[i + 2] > 240) {
            data[i + 3] = 0;
          }
        }
        ctx.putImageData(imageData, 0, 0);
        setProcessedSrc(canvas.toDataURL('image/png'));
      } catch {
        // CORS or security error — fall back to original
        setProcessedSrc(null);
      }
    };
    img.src = src;
  }, [darkMode, src]);

  if (darkMode) {
    return (
      // White bg here appears BLACK after the body dark-mode inversion.
      // Transparent pixels in the processed image reveal this wrapper,
      // which the body filter then inverts to black.
      <span
        className="inline-flex rounded-lg overflow-hidden"
        style={{ backgroundColor: 'white' }}
      >
        <img src={processedSrc || src} alt="Pynnacle" className={className} />
      </span>
    );
  }

  return <img src={src} alt="Pynnacle" className={className} />;
}
