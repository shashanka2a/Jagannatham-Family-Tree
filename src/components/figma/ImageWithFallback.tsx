'use client'

import React, { useState } from 'react'
import Image from 'next/image'

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=='

interface ImageWithFallbackProps extends Omit<React.ComponentPropsWithoutRef<'img'>, 'src'> {
  src?: string
  alt?: string
  className?: string
  style?: React.CSSProperties
  width?: number
  height?: number
}

export function ImageWithFallback({ src, alt, className, style, width, height, ...rest }: ImageWithFallbackProps) {
  const [didError, setDidError] = useState(false)
  const [imgSrc, setImgSrc] = useState(src)

  const handleError = () => {
    setDidError(true)
    setImgSrc(ERROR_IMG_SRC)
  }

  // If error or no src, show error image
  if (didError || !imgSrc) {
    return (
      <div
        className={`inline-block bg-gray-100 text-center align-middle ${className ?? ''}`}
        style={style}
      >
        <div className="flex items-center justify-center w-full h-full">
          <img src={ERROR_IMG_SRC} alt={alt || 'Error loading image'} {...rest} />
        </div>
      </div>
    )
  }

  // Use Next.js Image for remote images (if width/height provided or if it's in a container with fill)
  if ((imgSrc.startsWith('http://') || imgSrc.startsWith('https://')) && (width || height || className?.includes('fill'))) {
    // For images with explicit dimensions
    if (width && height) {
      return (
        <Image
          src={imgSrc}
          alt={alt || ''}
          width={width}
          height={height}
          className={className}
          style={style}
          onError={handleError}
          unoptimized
          {...rest}
        />
      )
    }
    // For fill images (when parent has position: relative)
    return (
      <Image
        src={imgSrc}
        alt={alt || ''}
        fill
        className={className}
        style={style}
        onError={handleError}
        unoptimized
        {...rest}
      />
    )
  }

  // Fallback to regular img for data URIs or when dimensions aren't available
  return (
    <img
      src={imgSrc}
      alt={alt || ''}
      className={className}
      style={style}
      onError={handleError}
      {...rest}
    />
  )
}
