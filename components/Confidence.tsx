import React from 'react';
import { cn } from './lib/utils';

interface ConfidenceItem {
  text: string;
  confidence: number;
}

// A component to render a colored dot based on a confidence score
export const ConfidenceDot = ({ confidence, className }: { confidence: number; className?: string }) => {
  const color =
    confidence > 0.8
      ? 'bg-green-500'
      : confidence > 0.6
      ? 'bg-yellow-500'
      : 'bg-red-500';
  return <div className={cn('w-2 h-2 rounded-full', color, className)} title={`Confianza: ${(confidence * 100).toFixed(0)}%`} />;
};

// A component to display a value and its confidence level
export const ConfidenceDisplay = ({ item, className }: { item: ConfidenceItem | string; className?: string }) => {
  if (typeof item === 'string') {
    return <span className={className}>{item}</span>;
  }

  if (!item || typeof item.text !== 'string') {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      <span className={className}>{item.text}</span>
      {typeof item.confidence === 'number' && <ConfidenceDot confidence={item.confidence} />}
    </div>
  );
};
