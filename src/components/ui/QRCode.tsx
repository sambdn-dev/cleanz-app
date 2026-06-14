'use client';

import { useMemo } from 'react';

interface QRCodeProps {
  data: string;
  size?: number;
  fgColor?: string;
  bgColor?: string;
}

// Simple QR code generator using a basic encoding
// For production, consider using a library like 'qrcode'
// This is a simplified version that creates a visual pattern

const QR_SIZE = 25; // 25x25 modules

// Generate a deterministic pattern from data (simplified QR-like visual)
const generatePattern = (data: string): boolean[][] => {
  const grid: boolean[][] = Array(QR_SIZE).fill(null).map(() => Array(QR_SIZE).fill(false));

  // Fixed position patterns (corners)
  const drawFinderPattern = (x: number, y: number) => {
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 7; j++) {
        const isOuter = i === 0 || i === 6 || j === 0 || j === 6;
        const isInner = i >= 2 && i <= 4 && j >= 2 && j <= 4;
        if (isOuter || isInner) {
          if (x + i < QR_SIZE && y + j < QR_SIZE) {
            grid[y + j][x + i] = true;
          }
        }
      }
    }
  };

  drawFinderPattern(0, 0);
  drawFinderPattern(QR_SIZE - 7, 0);
  drawFinderPattern(0, QR_SIZE - 7);

  // Data area: hash the input to create a pattern
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    hash = ((hash << 5) - hash + data.charCodeAt(i)) | 0;
  }

  // Fill data modules based on hash
  for (let y = 0; y < QR_SIZE; y++) {
    for (let x = 0; x < QR_SIZE; x++) {
      // Skip finder patterns
      const inFinder = (x < 8 && y < 8) || (x >= QR_SIZE - 8 && y < 8) || (x < 8 && y >= QR_SIZE - 8);
      if (inFinder) continue;

      // Timing patterns
      if (x === 6 || y === 6) {
        grid[y][x] = (x + y) % 2 === 0;
        continue;
      }

      // Data based on hash
      const seed = hash ^ (x * 31 + y * 17);
      grid[y][x] = (seed & (1 << ((x + y) % 16))) !== 0;
    }
  }

  return grid;
};

export const QRCode = ({ data, size = 120, fgColor = '#2D1F3D', bgColor = '#FFFFFF' }: QRCodeProps) => {
  const pattern = useMemo(() => generatePattern(data), [data]);
  const moduleSize = size / QR_SIZE;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <rect width={size} height={size} fill={bgColor} rx={4} />
      {pattern.map((row, y) =>
        row.map((cell, x) =>
          cell ? (
            <rect
              key={`${x}-${y}`}
              x={x * moduleSize}
              y={y * moduleSize}
              width={moduleSize + 0.5}
              height={moduleSize + 0.5}
              fill={fgColor}
            />
          ) : null
        )
      )}
    </svg>
  );
};
