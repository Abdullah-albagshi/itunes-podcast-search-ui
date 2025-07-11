'use client';
import React from 'react';
import { Episode } from '@/types/podcast';

interface EpisodeCardProps {
  episode: Episode; // Replace 'any' with a proper type later
}

export function EpisodeCard({ episode }: EpisodeCardProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-4 w-56 flex-shrink-0">
      {/* Replace with episode image */}
      <div className="h-32 w-full bg-gray-700 rounded mb-2"></div>
      <div className="font-bold text-sm truncate mb-1">{episode.trackName || 'Episode Title'}</div>
      <div className="text-xs text-gray-400 truncate">{episode.collectionName || 'Podcast Name'}</div>
      <div className="text-xs text-gray-500 mt-1">{episode.releaseDate || 'Date'} · {episode.episodeLength || 'Duration'}</div>
    </div>
  );
} 