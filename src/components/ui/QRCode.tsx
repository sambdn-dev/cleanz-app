'use client';

import { useEffect, useState } from 'react';
import QRCodeLib from 'qrcode';

interface QRCodeProps {
  data: string;
  size?: number;
  fgColor?: string;
  bgColor?: string;
}

/**
 * QR code réel et scannable, généré via la librairie `qrcode`.
 */
export const QRCode = ({ data, size = 140, fgColor = '#2D1F3D', bgColor = '#FFFFFF' }: QRCodeProps) => {
  const [url, setUrl] = useState('');

  useEffect(() => {
    let active = true;
    QRCodeLib.toDataURL(data, {
      width: size * 3, // haute résolution pour l'impression
      margin: 2,
      errorCorrectionLevel: 'M',
      color: { dark: fgColor, light: bgColor },
    })
      .then((u) => { if (active) setUrl(u); })
      .catch(() => { if (active) setUrl(''); });
    return () => { active = false; };
  }, [data, size, fgColor, bgColor]);

  if (!url) {
    return (
      <div
        className="rounded-lg animate-pulse"
        style={{ width: size, height: size, background: 'rgba(0,0,0,0.06)' }}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={url} width={size} height={size} alt="QR code du spray" style={{ borderRadius: 8 }} />
  );
};

/**
 * Génère un data URL PNG du QR (utilisé pour l'impression).
 */
export const generateQRDataUrl = (data: string, fgColor = '#2D1F3D', bgColor = '#FFFFFF'): Promise<string> => {
  return QRCodeLib.toDataURL(data, {
    width: 600,
    margin: 2,
    errorCorrectionLevel: 'M',
    color: { dark: fgColor, light: bgColor },
  });
};
