'use client';
import React, { useLayoutEffect, useRef, useState } from 'react';

interface ScrollbarProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export function Scrollbar({ containerRef, orientation = 'horizontal', className = '' }: ScrollbarProps) {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [thumbWidth, setThumbWidth] = useState(20);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateScrollInfo = () => {
      const current = container.scrollLeft;
      const maxScroll = container.scrollWidth - container.clientWidth;
      
      // Calculate available space for thumb movement
      const trackWidth = container.clientWidth;
      const viewportRatio = container.clientWidth / container.scrollWidth;
      const minThumbWidth = 20; // minimum thumb width in percentage
      const thumbWidthPercent = Math.max(viewportRatio * 100, minThumbWidth);
      setThumbWidth(thumbWidthPercent);

      // Adjust scroll percentage to account for thumb width
      const availableSpace = trackWidth - (trackWidth * (thumbWidthPercent / 100));
      const adjustedPercentage = (current / maxScroll) * (availableSpace / trackWidth) * 100;
      setScrollPercentage(Math.min(Math.max(adjustedPercentage, 0), 100));
    };

    updateScrollInfo();
    container.addEventListener('scroll', updateScrollInfo);
    window.addEventListener('resize', updateScrollInfo);

    return () => {
      container.removeEventListener('scroll', updateScrollInfo);
      window.removeEventListener('resize', updateScrollInfo);
    };
  }, [containerRef]);

  const handleTrackClick = (e: React.MouseEvent) => {
    const track = trackRef.current;
    const container = containerRef.current;
    if (!track || !container) return;

    const rect = track.getBoundingClientRect();
    const clickPos = e.clientX - rect.left;
    const trackWidth = rect.width;
    const maxScroll = container.scrollWidth - container.clientWidth;
    
    // Account for thumb width in click position calculation
    const thumbWidthPx = (thumbWidth / 100) * trackWidth;
    const availableSpace = trackWidth - thumbWidthPx;
    const adjustedClickPos = Math.max(Math.min(clickPos - (thumbWidthPx / 2), availableSpace), 0);
    const scrollPercentage = adjustedClickPos / availableSpace;
    
    const newScrollLeft = scrollPercentage * maxScroll;
    container.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    });
  };

  return (
    <div className={`px-2 ${className}`}>
      <div 
        ref={trackRef}
        onClick={handleTrackClick}
        className="relative h-2 rounded transition-all duration-100 cursor-pointer"
        style={{
          backgroundColor: 'hsla(230,3%,62%,10%)',
        }}
      >
        <div
          className="absolute top-0 h-full rounded transition-all duration-100"
          style={{
            backgroundColor: '#404080',
            width: `${thumbWidth}%`,
            left: `${scrollPercentage}%`,
          }}
        />
      </div>
    </div>
  );
} 