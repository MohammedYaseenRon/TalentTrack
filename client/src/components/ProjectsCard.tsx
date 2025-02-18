"use client";

import Image from 'next/image';
import { useState } from 'react';

interface ProjectImageProps {
  imageUrl?: string;
  altText: string;
}

export function ProjectImage({ imageUrl, altText }: ProjectImageProps) {
  const [imageError, setImageError] = useState(false);
  
  // Generate a consistent placeholder for each project based on its name
  const getPlaceholderUrl = () => {
    const seed = encodeURIComponent(altText.toLowerCase().replace(/\s+/g, '-'));
    return `https://picsum.photos/seed/${seed}/800/600`;
  };

  return (
    <div className="h-48 relative rounded-t-xl overflow-hidden bg-gray-100">
      <Image
        src={imageUrl && !imageError ? imageUrl : getPlaceholderUrl()}
        alt={altText}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover"
        onError={() => setImageError(true)}
        priority={false}
        unoptimized={imageError} // Skip optimization for placeholder images
      />
    </div>
  );
}