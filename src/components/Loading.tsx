'use client';
import React from 'react';
import { Skeleton } from './ui/skeleton';

export function Loading() {
  return (
    <div className="flex items-center justify-center gap-4 py-8">
      {
        Array.from({ length: 8 }).map((_, index) => (
          <Skeleton key={index} className="w-[250px] h-[250px] rounded-lg" />
        ))
      }
    </div>
  );
} 